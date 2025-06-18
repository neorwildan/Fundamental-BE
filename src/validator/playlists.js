const { InvariantError } = require('../clienterror');

const PlaylistsValidator = {
  validatePostPlaylistPayload: (payload) => {
    const { name } = payload;
    if (!name) {
      throw new InvariantError('Nama playlist harus diisi');
    }
  },
  validatePostPlaylistSongPayload: (payload) => {
    const { songId } = payload;
    if (!songId) {
      throw new InvariantError('Song ID harus diisi');
    }
  },
};

module.exports = PlaylistsValidator;