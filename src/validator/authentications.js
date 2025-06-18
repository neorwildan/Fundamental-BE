const { InvariantError } = require('../clienterror');

const AuthenticationsValidator = {
  validatePostAuthenticationPayload: (payload) => {
    const { username, password } = payload;
    if (!username || !password) {
      throw new InvariantError('ID, username, dan password harus diisi');
    }
  },
  validatePutAuthenticationPayload: (payload) => {
    const { refreshToken } = payload;
    if (!refreshToken) {
      throw new InvariantError('Refresh token harus diisi');
    }
  },
  validateDeleteAuthenticationPayload: (payload) => {
    const { refreshToken } = payload;
    if (!refreshToken) {
      throw new InvariantError('Refresh token harus diisi');
    }
  },
};

module.exports = AuthenticationsValidator;