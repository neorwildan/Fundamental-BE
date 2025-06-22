const { InvariantError } = require('../clienterror');

const PlaylistsValidator = {
  validatePostPlaylistPayload: (payload) => {
    const { name } = payload;
    if (!name || typeof name !== 'string' || name.trim() === '') {
      throw new InvariantError('Nama playlist harus berupa string dan tidak boleh kosong');
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