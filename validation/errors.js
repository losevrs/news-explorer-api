const {
  INCORRECT_DATA_ERROR,
  SERVER_ERROR,
  CONFLICT_ERROR,
  INCORRECT_DBDATA_ERROR,
} = require('./errorcodes');

function sendError(error, res) {
  let errorCode = SERVER_ERROR.code;
  let errorMessage = SERVER_ERROR.message;

  switch (error.name) {
    case 'MongoError':
      errorCode = INCORRECT_DBDATA_ERROR.code;
      errorMessage = INCORRECT_DBDATA_ERROR.message;
      if (error.code === 11000) {
        errorCode = CONFLICT_ERROR.code;
        errorMessage = CONFLICT_ERROR.message;
      }
      break;
    case 'CastError':
    case 'ValidationError':
      errorCode = INCORRECT_DATA_ERROR.code;
      errorMessage = INCORRECT_DATA_ERROR.message;
      break;
    case 'ObjectNotFound':
    case 'Forbidden':
    case 'NotAutorisation':
    case 'LoginFailed':
      errorCode = error.code;
      errorMessage = error.message;
      break;
    default:
      break;
  }

  res.status(errorCode).send({ message: errorMessage });
}

module.exports = {
  sendError,
};
