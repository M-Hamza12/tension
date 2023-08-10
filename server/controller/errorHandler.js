module.exports = (error, req, resp, next) => {
  console.log(error, ' in here');
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';
  let message = '';
  if (error.name === 'ValidationError') {
    let key = Object.keys(error.errors)[0];
    message = error.errors[key].message;
    error.problemField = key;
  }
  if (message.length === 0 && error.code === 11000) {
    // console.log(Object.keys(error.keyValue));
    message = Object.keys(error.keyValue)[0] + ' has already been taken.';
    error.problemField = Object.keys(error.keyValue)[0];
  }
  if (message.includes('Path'))
    message = message.replace('Path', '').trim().split('.')[0];
  resp.status(error.statusCode).json({
    status: 'fail',
    error,
    message: message.length === 0 ? error.message : message,
    problemField: error.problemField,
  });
};
