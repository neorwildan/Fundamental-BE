require('dotenv').config();
const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const Jwt = require('@hapi/jwt');

const init = async () => {
  const server = Hapi.server({
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 5000,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

    // Register JWT plugin
  await server.register([
    {
      plugin: Jwt,
    },
  ]);

  // Define authentication strategy
  server.auth.strategy('openmusic_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });

  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();