const albumsHandler = require('./albums/handler');
const songsHandler = require('./songs/handler');
const UsersHandler = require('./users/handler');
const AuthenticationsHandler = require('./authentications/handler');
const PlaylistsHandler = require('./playlists/handler');
const PlaylistsService = require('./playlists/service');
const PlaylistsValidator = require('./validator/playlists');

const UsersService = require('./users/service');
const UserValidator = require('./validator/users');
const AuthenticationsService = require('./authentications/service');
const AuthenticationsValidator = require('./validator/authentications');

// Instansiasi handler class
const usersService = new UsersService();
const userValidator = UserValidator; // jika validator berupa objek
const usersHandler = new UsersHandler(usersService, userValidator);
const authenticationsService = new AuthenticationsService();
const authenticationsHandler = new AuthenticationsHandler(authenticationsService, AuthenticationsValidator);
const playlistsService = new PlaylistsService();
const playlistsHandler = new PlaylistsHandler(playlistsService, PlaylistsValidator);

// albumsHandler dan songsHandler sudah berbentuk objek, tidak perlu diubah

const routes = [
  // Albums
  {
    method: 'POST',
    path: '/albums',
    handler: albumsHandler.postAlbumHandler,
  },
  {
    method: 'GET',
    path: '/albums/{albumId}',
    handler: albumsHandler.getAlbumByIdHandler,
  },
  {
    method: 'PUT',
    path: '/albums/{id}',
    handler: albumsHandler.putAlbumByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/albums/{id}',
    handler: albumsHandler.deleteAlbumByIdHandler,
  },

  // Songs
  {
    method: 'POST',
    path: '/songs',
    handler: songsHandler.postSongHandler,
  },
  {
    method: 'GET',
    path: '/songs',
    handler: songsHandler.getSongsHandler,
  },
  {
    method: 'GET',
    path: '/songs/{id}',
    handler: songsHandler.getSongByIdHandler,
  },
  {
    method: 'PUT',
    path: '/songs/{id}',
    handler: songsHandler.putSongByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/songs/{id}',
    handler: songsHandler.deleteSongByIdHandler,
  },

  // Users
  {
    method: 'POST',
    path: '/users',
    handler: usersHandler.postUserHandler,
  },

  // Authentications
  {
    method: 'POST',
    path: '/authentications',
    handler: authenticationsHandler.postAuthenticationHandler,
  },
  {
    method: 'PUT',
    path: '/authentications',
    handler: authenticationsHandler.putAuthenticationHandler,
  },
  {
    method: 'DELETE',
    path: '/authentications',
    handler: authenticationsHandler.deleteAuthenticationHandler,
  },

  // Playlists
  {
    method: 'POST',
    path: '/playlists',
    handler: playlistsHandler.postPlaylistHandler,
    options: {
      auth: 'openmusic_jwt',
    },
  },
  {
    method: 'GET',
    path: '/playlists',
    handler: playlistsHandler.getPlaylistsHandler,
    options: {
      auth: 'openmusic_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{id}',
    handler: playlistsHandler.deletePlaylistHandler,
    options: {
      auth: 'openmusic_jwt',
    },
  },
  {
    method: 'POST',
    path: '/playlists/{id}/songs',
    handler: playlistsHandler.postPlaylistSongHandler,
    options: {
      auth: 'openmusic_jwt',
    },
  },
  {
    method: 'GET',
    path: '/playlists/{id}/songs',
    handler: playlistsHandler.getPlaylistSongsHandler,
    options: {
      auth: 'openmusic_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{id}/songs',
    handler: playlistsHandler.deletePlaylistSongHandler,
    options: {
      auth: 'openmusic_jwt',
    },
  },
];

module.exports = routes;