const SongsService = require('./service');
const { songPayloadSchema } = require('../validator/songs');
const { ClientError, NotFoundError } = require('../clienterror');

const songsService = new SongsService();
const postSongHandler = async (request, h) => {
  try {
    const {
      title, year, genre, performer, duration, albumId,
    } = request.payload;
    const { error } = songPayloadSchema.validate({
      title, year, genre, performer, duration, albumId,
    });

    if (error) {
      throw new ClientError(error.message, 400);
    }

    const songId = await songsService.addSong({
      title, year, genre, performer, duration, albumId,
    });

    const response = h.response({
      status: 'success',
      data: {
        songId,
      },
    });
    response.code(201);
    return response;
  } catch (error) {
    if (error instanceof ClientError) {
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
};

const getSongsHandler = async (request, h) => {
  try {
    const { title, performer } = request.query;
    const songs = await songsService.getSongs({ title, performer });

    return {
      status: 'success',
      data: {
        songs,
      },
    };
  } catch (error) {
    if (error instanceof ClientError) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(error.statusCode);
      return response;
    }

    const response = h.response({
      status: 'error',
      message: 'Maaf, terjadi kegagalan pada server kami.',
    });
    response.code(500);
    console.error(error);
    return response;
  }
};

const getSongByIdHandler = async (request, h) => {
  try {
    const { id } = request.params;
    const song = await songsService.getSongById(id);

    return {
      status: 'success',
      data: {
        song,
      },
    };
  } catch (error) {
    if (error.message === 'Lagu tidak ditemukan') {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(404);
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
};

const putSongByIdHandler = async (request, h) => {
  try {
    const { id } = request.params;
    const {
      title, year, genre, performer, duration, albumId,
    } = request.payload;
    const { error } = songPayloadSchema.validate({
      title, year, genre, performer, duration, albumId,
    });

    if (error) {
      throw new ClientError(error.message, 400);
    }

    await songsService.editSongById(id, {
      title, year, genre, performer, duration, albumId,
    });

    return {
      status: 'success',
      message: 'Lagu berhasil diperbarui',
    };
  } catch (error) {
    if (error instanceof ClientError) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(error.statusCode);
      return response;
    }

    if (error.message === 'Gagal memperbarui lagu. Id tidak ditemukan') {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(404);
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
};

const deleteSongByIdHandler = async (request, h) => {
  try {
    const { id } = request.params;
    await songsService.deleteSongById(id);

    return {
      status: 'success',
      message: 'Lagu berhasil dihapus',
    };
  } catch (error) {
    if (error.message === 'Gagal menghapus lagu. Id tidak ditemukan') {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(404);
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
};

module.exports = {
  postSongHandler,
  getSongsHandler,
  getSongByIdHandler,
  putSongByIdHandler,
  deleteSongByIdHandler,
};