const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_TIME } = require('../constants');

const jwtSign = promisify(jwt.sign);
const jwtVerify = promisify(jwt.verify);

const tokenConfig = {
  access: {
    secret: ACCESS_TOKEN_SECRET,
    expiresIn: ACCESS_TOKEN_TIME,
  },
};

const createToken = async (payload, options) =>
  jwtSign(payload, options.secret, { expiresIn: options.expiresIn });

const verifyToken = async (token, options) => jwtVerify(token, options.secret);

module.exports.createAccessToken = (payload) =>
  createToken(payload, tokenConfig.access);

module.exports.verifyAccessToken = (token) =>
  verifyToken(token, tokenConfig.access);
