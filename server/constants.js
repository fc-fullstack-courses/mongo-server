const CONSTANTS = {
  PORT: process.env.PORT || 5000,
  DB_STRING : process.env.DB_STRING || 'mongodb://localhost:27017/test',
  SALT_ROUNDS: 10
}

module.exports = CONSTANTS;