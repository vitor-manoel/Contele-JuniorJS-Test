module.exports = {

    development: {
      client: 'pg',
      connection: {
        host : 'ec2-35-168-77-215.compute-1.amazonaws.com',
        port: 5432,
        user : 'icpxsawhohgqvb',
        password : '',
        database : 'daj51r9dgraud1',
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
        host : 'ec2-35-168-77-215.compute-1.amazonaws.com',
        port: 5432,
        user : 'icpxsawhohgqvb',
        password : '',
        database : 'daj51r9dgraud1',
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