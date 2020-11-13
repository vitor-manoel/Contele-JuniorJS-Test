module.exports = {

    development: {
      client: 'pg',
      connection: {
        host : '',
        port: 0,
        user : '',
        password : '',
        database : '',
        ssl: { rejectUnauthorized: false },
      },
      pool: {
        max: 20
      },
      migrations: {
        directory: './src/database/migrations'
      },
      useNullAsDefault: true
    },
  
    test: {
        client: 'pg',
      connection: {
        host : '',
        user : '',
        port: 0,
        password : '',
        database : '',
        ssl: { rejectUnauthorized: false },
      },
      pool: {
        max: 20
      },
      migrations: {
        directory: './src/database/migrations'
      },
      useNullAsDefault: true
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