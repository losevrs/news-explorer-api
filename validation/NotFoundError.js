const { NOT_FOUND_ERROR } = require('./errorcodes');

class ObjectNotFoundError extends Error {
  constructor() {
    super(NOT_FOUND_ERROR.message);
    this.name = 'ObjectNotFound';
    this.code = NOT_FOUND_ERROR.code;
  }
}

module.exports = {
  ObjectNotFoundError,
};
