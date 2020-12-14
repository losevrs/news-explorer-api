const { LOGIN_FAILED } = require('./errorcodes');

class LoginFailedError extends Error {
  constructor() {
    super(LOGIN_FAILED.message);
    this.name = 'LoginFailed';
    this.code = LOGIN_FAILED.code;
  }
}

module.exports = {
  LoginFailedError,
};
