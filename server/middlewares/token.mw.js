const createHttpError = require('http-errors');
const JWTService = require('../services/jwt.service');
const Token = require('../db/models/token');

// refresh route only
module.exports.checkRefreshToken = async (req, res, next) => {
  try {
    const {
      body: { token },
    } = req;

    // по факту будет verifyRefreshToken
    await JWTService.verifyAccessToken(token);

    const refreshTokenInstance = await Token.findOne({ token });

    if (!refreshTokenInstance) {
      return next(createHttpError(404, 'Token not found'));
    }

    req.tokenData = refreshTokenInstance;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports.checkAccessToken = async (req, res, next) => {
  try {
    const {
      headers: { authorization },
    } = req;

    if (authorization) {
      const [authType, token] = authorization.split(' ');

      req.tokenData = await JWTService.verifyAccessToken(token);

      return next();
    }

    next(createHttpError(401, 'No token found'));
  } catch (error) {
    next(error);
  }
};
