// Update with your config settings.
const settings = require('./settings');


module.exports = {

  development: {
    client: 'pg',
    connection: {
      filename: './lookup_famousPeople.js',
      host : settings.hostname,
      user : settings.user,
      password : settings.password,
      database : settings.database

    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
