const CONSTANTS = {
  PORT: process.env.PORT || 5000,
  DB_STRING: process.env.DB_STRING || 'mongodb://localhost:27017/test',
  SALT_ROUNDS: 10,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_TIME: process.env.ACCESS_TOKEN_TIME,
};

module.exports = CONSTANTS;
