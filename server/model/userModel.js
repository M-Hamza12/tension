const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
    validate: [validator.isEmail, 'email is invalid'],
  },
  userName: {
    type: String,
    required: [true, 'userName is required'],
    unique: true,
  },

  password: {
    type: String,
    required: [true, 'password is required'],
    minlength: [8, 'password should have atlease 8 characters'],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, 'confirmPassword is required'],
    minlength: [8, 'password should have atlease 8 characters'],
    validate: {
      validator: function (val) {
        return this.password === val;
      },
      message: 'password does not match',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

//encrypting password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

//methods
userSchema.methods.comparePassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

let User = mongoose.model('User', userSchema);

module.exports = User;
