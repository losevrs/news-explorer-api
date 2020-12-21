const { NOT_AUTORISATION } = require('./errorcodes');

class NotAutorisationError extends Error {
  constructor() {
    super(NOT_AUTORISATION.message);
    this.name = 'NotAutorisation';
    this.code = NOT_AUTORISATION.code;
  }
}

module.exports = {
  NotAutorisationError,
};
