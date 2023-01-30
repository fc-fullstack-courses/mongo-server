const { JsonWebTokenError, TokenExpiredError } = require('jsonwebtoken');

module.exports.basicHandler = async (err, req, res, next) => {
  res.status(err.status || 500).send({ error: err });
};

module.exports.tokenErrorHandler = async (err, req, res, next) => {
  if (err instanceof JsonWebTokenError) {
    return res.status(401).send({ error: { message: 'Invalid JWT' } });
  }

  if (err instanceof TokenExpiredError) {
    return res.status(419).send({ error: { message: 'Expired JWT' } });
  }

  next();
};
