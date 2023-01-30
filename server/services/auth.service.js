const User = require('../db/models/users');
const Token = require('../db/models/token');

const JWTService = require('./jwt.service');

module.exports.createSession = async (user) => {
  const tokenPayload = {
    firstName: user.firstName,
    lastName: user.lastName,
    id: user._id,
  };

  const accessToken = await JWTService.createAccessToken(tokenPayload);

  await Token.create({ userId: user._id, token: accessToken });

  return { user, tokens: { access: accessToken } };
};

module.exports.refreshSession = async (tokenInstance) => {
  // Ищем данные юзера
  const foundUser = await User.findById(tokenInstance.userId);

  if (!foundUser) {
    return next(createHttpError(404, 'User not found'));
  }

  const tokenPayload = {
    firstName: foundUser.firstName,
    lastName: foundUser.lastName,
    id: foundUser._id,
  };

  const accessToken = await JWTService.createAccessToken(tokenPayload);

  // обновляем токен в БД
  await Token.findOneAndUpdate(
    { token: tokenInstance.token },
    { token: accessToken }
  );

  return { user: foundUser, tokens: { access: accessToken } };
};
