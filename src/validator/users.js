const { InvariantError } = require('../clienterror');

const UserValidator = {
  validateUserPayload: (payload) => {
    const { username, password, fullname } = payload;

    if (!username) {
      throw new InvariantError('harus mengirimkan username');
    }
    if (!password) {
      throw new InvariantError('harus mengirimkan password');
    }
    if (!fullname) {
      throw new InvariantError('harus mengirimkan fullname');
    }
  },
};

module.exports = UserValidator;