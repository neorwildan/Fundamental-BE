const AlbumsService = require('./service');
const { albumPayloadSchema } = require('../validator/albums');
const { ClientError, NotFoundError } = require('../clienterror');

const albumsService = new AlbumsService();

const postAlbumHandler = async (request, h) => {
  try {
    const { name, year } = request.payload;
    const { error } = albumPayloadSchema.validate({ name, year });

    if (error) {
      throw new ClientError(error.message, 400);
    }

    const albumId = await albumsService.addAlbum({ name, year });

    const response = h.response({
      status: 'success',
      data: {
        albumId,
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

const getAlbumByIdHandler = async (request, h) => {
  try {
    const { albumId } = request.params;
    const album = await albumsService.getAlbumById(albumId);

    return {
      status: 'success',
      data: {
        album,
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

const putAlbumByIdHandler = async (request, h) => {
  try {
    const { id } = request.params;
    const { name, year } = request.payload;
    const { error } = albumPayloadSchema.validate({ name, year });

    if (error) {
      throw new ClientError(error.message, 400);
    }

    await albumsService.editAlbumById(id, { name, year });

    return {
      status: 'success',
      message: 'Album berhasil diperbarui',
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

    if (error.message === 'Gagal memperbarui album. Id tidak ditemukan') {
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

const deleteAlbumByIdHandler = async (request, h) => {
  try {
    const { id } = request.params;
    await albumsService.deleteAlbumById(id);

    return {
      status: 'success',
      message: 'Album berhasil dihapus',
    };
  } catch (error) {
    if (error.message === 'Gagal menghapus album. Id tidak ditemukan') {
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
  postAlbumHandler,
  getAlbumByIdHandler,
  putAlbumByIdHandler,
  deleteAlbumByIdHandler,
};