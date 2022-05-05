const path = require('path')

module.exports = {
  development: {
    client: 'better-sqlite3',
    connection: {
      filename: path.join(__dirname, 'dev.sqlite3'),
    },
    useNullAsDefault: true,
  },
  test: {
    client: 'better-sqlite3',
    connection: {
      filename: ':memory:',
    },
    useNullAsDefault: true,
    seeds: {
      directory: path.join(__dirname, 'seeds'),
    },
    migrations: {
      directory: path.join(__dirname, 'migrations'),
    },
  },
  production: {
    client: 'postgresql',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
}

// PORT=5432
// NODE_ENV=development
// DB_HOST=localhost
// DB_USER=postgres
// DB_PASS=1cecreaM
// DB_NAME=postgres
// DATABASE_URL=
