const { Pool } = require('pg');

class Database {
  constructor() {
    if (!Database.instance) {
      this._pool = new Pool({
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        host: process.env.PGHOST,
        port: process.env.PGPORT,
      });

      this._pool.on('error', (err) => {
        console.error('Unexpected error on idle client', err);
        process.exit(-1);
      });

      Database.instance = this;
    }

    return Database.instance;
  }

  async query(query, values) {
    const client = await this._pool.connect();
    try {
      const result = await client.query(query, values);
      return result;
    } finally {
      client.release();
    }
  }
}

const database = new Database();
module.exports = database;