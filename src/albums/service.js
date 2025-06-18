const database = require('../database');
const { nanoid } = require('nanoid');
const { NotFoundError } = require('../clienterror');

class AlbumsService {
  async addAlbum({ name, year }) {
    const id = `album-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO albums VALUES($1, $2, $3) RETURNING id',
      values: [id, name, year],
    };

    const result = await database.query(query);
    return result.rows[0].id;
  }

  async getAlbumById(id) {
    // Ambil data album
    const albumQuery = {
      text: 'SELECT id, name, year FROM albums WHERE id = $1',
      values: [id],
    };
    const albumResult = await database.query(albumQuery);

    if (!albumResult.rows.length) {
      throw new NotFoundError('Album tidak ditemukan');
    }

    // Ambil daftar lagu di album ini
    const songsQuery = {
      text: 'SELECT id, title, performer FROM songs WHERE album_id = $1',
      values: [id],
    };
    const songsResult = await database.query(songsQuery);

    // Gabungkan hasil
    const album = albumResult.rows[0];
    album.songs = songsResult.rows; // Selalu array, bisa kosong

    return album;
  }

  async editAlbumById(id, { name, year }) {
    const query = {
      text: 'UPDATE albums SET name = $1, year = $2 WHERE id = $3 RETURNING id',
      values: [name, year, id],
    };

    const result = await database.query(query);

    if (!result.rows.length) {
      throw new Error('Gagal memperbarui album. Id tidak ditemukan');
    }
  }

  async deleteAlbumById(id) {
    const query = {
      text: 'DELETE FROM albums WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await database.query(query);

    if (!result.rows.length) {
      throw new Error('Gagal menghapus album. Id tidak ditemukan');
    }
  }
}

module.exports = AlbumsService;