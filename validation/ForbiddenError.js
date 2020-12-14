const { FORBIDDEN_ERROR } = require('./errorcodes');

class ForbiddenError extends Error {
  constructor() {
    super(FORBIDDEN_ERROR.message);
    this.name = 'Forbidden';
    this.code = FORBIDDEN_ERROR.code;
  }
}

module.exports = {
  ForbiddenError,
};
