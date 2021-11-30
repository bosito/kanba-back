import errorMessages from '../utils/error-messages.js';

const handleErrors = (error, req, res, next) => {
  console.log(error.stack);
  const { status, message } = errorMessages[error.name];
  res.status(status).json({
    error: error.message,
  });
};

export default handleErrors;
