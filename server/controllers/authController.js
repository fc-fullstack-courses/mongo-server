const createHttpError = require('http-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../db/models/users');
const Token = require('../db/models/token');
const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_TIME } = require('../constants');

const jwtSign = promisify(jwt.sign);
const jwtVerify = promisify(jwt.verify);

module.exports.registration = async (req, res, next) => {
  try {
    const { body } = req;

    const user = await User.create(body);

    const tokenPayload = {
      firstName: user.firstName,
      lastName: user.lastName,
      id: user._id,
    };

    // создаем токен для пользователя
    const accessToken = await jwtSign(tokenPayload, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_TIME,
    });

    await Token.create({ userId: user._id, token: accessToken });

    res.status(201).send({ data: user, tokens: { access: accessToken } });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  const {
    body: { email, password },
  } = req;

  // 1 проверить наличие пользователя
  const foundUser = await User.findOne({ email: email });

  if (!foundUser) {
    return next(createHttpError(404, 'Invalid email / password'));
  }

  // 2 проверяем пароль с захешированным
  if (!bcrypt.compareSync(password, foundUser.password)) {
    return next(createHttpError(404, 'Invalid email / password'));
  }

  const tokenPayload = {
    firstName: foundUser.firstName,
    lastName: foundUser.lastName,
    id: foundUser._id,
  };

  const accessToken = await jwtSign(tokenPayload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_TIME,
  });

  await Token.create({ userId: foundUser._id, token: accessToken });

  res.send({ data: foundUser, tokens: { access: accessToken } });
};

module.exports.refresh = async (req, res, next) => {
  try {
    const {
      body: { token },
    } = req;

    // Ищем токен в БД
    const foundToken = await Token.findOne({token});

    if(!foundToken) {
      return next(createHttpError(404, 'Token not found'));
    }

    // Проверяем его валидность
    const { userId } = await jwtVerify(token, ACCESS_TOKEN_SECRET);

    // Ищем данные юзера
    const foundUser = await User.findById(userId);

    if (!foundUser) {
      return next(createHttpError(404, 'User not found'));
    }

    const tokenPayload = {
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      id: foundUser._id,
    };
  
    const accessToken = await jwtSign(tokenPayload, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_TIME,
    });

    // обновляем токен в БД
    await Token.findOneAndUpdate({token}, {token: accessToken});

    res.send({ data: foundUser, tokens: { access: accessToken } });
  } catch (error) {
    next(error);
  }
};
