const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require("../model/userModel");
const APIError = require('../Utils/APIError');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.createUser = async (req, resp, next) => {
  try {
    const newUser = await User.create(req.body);
    resp.status(201).json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};

exports.signIn = async (req, resp, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return next(new APIError('Email or password is required', 400));

    const user = await User.findOne({ email }).select('+password');
    if (!user) return next(new APIError('Email or password is incorrect', 400));
    let passwordCorrect = await user.comparePassword(password, user.password);
    if (!passwordCorrect)
      return next(new APIError('Email or password is incorrect', 400));
    const token = signToken(user.id);
    resp.status(200).json({
      status: 'success',
      data: {
        user: {
          email: user.email,
          id: user.id,
          userName: user.userName,
        },
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};
exports.protect = async (req, resp, next) => {
  let token = '';
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer') &&
    req.headers.authorization.split(' ').length === 2 &&
    req.headers.authorization.split(' ')[1] !== ''
  ) {
    token = req.headers.authorization.split(' ')[1]; // Bearer {token}
  } else return next(new APIError('Please login'));

  if (token === '') return next(new APIError('Please login to continue'));

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) return next(new APIError('The user no longer exist'));

  //Password Changed check!

  req.user = currentUser;
  next();
};

exports.overview = (req, resp, next) => {
  resp.status(200).json({
    status: 'success',
    data: {
      user: req.user,
    },
  });
};
exports.changePassword = async (req, resp, next) => {
  const { password, changePassword, confirmPassword } = req.body;
  const user = await User.findById(req.user.id).select('+password');
  if (!password || !changePassword || !confirmPassword)
    return next(new APIError('Please enter all fields', 400));

  if (!user) return next(new APIError('User no longer exist', 400));
  let isCorrect = user.comparePassword(password, user.password);
  if (!isCorrect) return next(new APIError('Password is incorrect', 404));
  user.password = changePassword;
  user.confirmPassword = confirmPassword;
  await user.save();
  resp.status(200).json({
    status: 'success',
  });
};
