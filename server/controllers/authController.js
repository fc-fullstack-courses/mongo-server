const createHttpError = require('http-errors');
const bcrypt = require('bcrypt');
const User = require('../db/models/users');

module.exports.registration = async (req, res, next) => {
  try {
    const { body } = req;

    const user = await User.create(body);

    res.status(201).send({ data: user });
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

  // 3 отправляем данные
  res.send({ data: foundUser });
};

module.exports.refresh = async (req, res, next) => {
  try {
    const { body: { userId } } = req;

    // 1 проверки
    const foundUser = await User.findById( userId );

    if (!foundUser) {
      return next(createHttpError(404, 'User not found'));
    }

    // 2 отправляем данные
    res.send({ data: foundUser });
  } catch (error) {
    next(error);
  }
};
