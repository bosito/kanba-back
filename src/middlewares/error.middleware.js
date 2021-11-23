import errorMessages from '../utils/error-messages.js';

const handleErrors = (error, req, res, next) => {
  const { status, message } = errorMessages[error.name];
  res.status(status).json({
    message,
  });
};

export default handleErrors;
