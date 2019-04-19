module.exports = {
  local: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: +process.env.DB_PORT,
    host: process.env.DB_HOST,
    dialect: process.env.DB_ENGINE
  },
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: +process.env.DB_PORT,
    host: process.env.DB_HOST,
    dialect: process.env.DB_ENGINE
  },
  staging: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: +process.env.DB_PORT,
    host: process.env.DB_HOST,
    dialect: process.env.DB_ENGINE
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: +process.env.DB_PORT,
    host: process.env.DB_HOST,
    dialect: process.env.DB_ENGINE
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: +process.env.DB_PORT,
    host: process.env.DB_HOST,
    dialect: process.env.DB_ENGINE
  }
}
