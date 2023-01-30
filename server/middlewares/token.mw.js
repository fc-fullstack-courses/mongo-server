const createHttpError = require('http-errors');
const JWTService = require('../services/jwt.service');

// refresh route only
module.exports.checkRefreshToken = async (req, res, next) => {
  try {
    const {
      body: { token },
    } = req;

    // по факту будет verifyRefreshToken
    const tokenData = await JWTService.verifyAccessToken(token);

    req.tokenData = tokenData;
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
