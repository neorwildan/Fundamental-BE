const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const UsersService = require('./service');
const UserValidator = require('../validator/users');
const { InvariantError } = require('../clienterror');

class UsersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postUserHandler = this.postUserHandler.bind(this);
  }

  async postUserHandler(request, h) {
    try {
      this._validator.validateUserPayload(request.payload);

      const { username, password, fullname } = request.payload;

      const userId = await this._service.addUser({ username, password, fullname });

      const response = h.response({
        status: 'success',
        data: {
          userId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof InvariantError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = UsersHandler;