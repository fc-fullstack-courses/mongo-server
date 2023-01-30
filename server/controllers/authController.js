const createHttpError = require('http-errors');
const bcrypt = require('bcrypt');

const User = require('../db/models/users');
const AuthService = require('../services/auth.service');

module.exports.registration = async (req, res, next) => {
  try {
    const { body } = req;

    const user = await User.create(body);

    const sessionData = await AuthService.createSession(user);

    res.status(201).send({ data: sessionData });
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

  const sessionData = await AuthService.createSession(foundUser);

  res.status(200).send({ data: sessionData });
};

module.exports.refresh = async (req, res, next) => {
  try {
    const { tokenData } = req;

    const session = await AuthService.refreshSession(tokenData);

    res.send({ data: session });
  } catch (error) {
    next(error);
  }
};
