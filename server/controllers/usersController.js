const createHttpError = require('http-errors');
const User = require('../db/models/users');

module.exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;

    const user = await User.create(body);

    res.status(201).send({ data: user });
  } catch (error) {
    next(error);
  }
};

module.exports.getUsers = async (req, res, next) => {
  const {
    query: { limit = 0, offset = 0 },
  } = req;
  const users = await User.find()
    .select(['-password', '-__v'])
    .limit(limit)
    .skip(offset);

  res.send({ data: users });
};

module.exports.getUser = async (req, res, next) => {
  const {
    params: { userId },
  } = req;

  const user = await User.findById(userId).select(['-password', '-__v']);

  if (!user) {
    return next(createHttpError(404, 'User not found'));
  }

  res.send({ data: user });
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const {
      params: { userId },
      body,
    } = req;

    const updatedUser = await User.findByIdAndUpdate(userId, body, {
      new: true,
    }).select(['-password', '-__v']);

    if (!updatedUser) {
      return next(createHttpError(404, 'User not found'));
    }

    res.send({ data: updatedUser });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUser = async (req, res, next) => {
  const {
    params: { userId },
  } = req;

  const deletedUser = await User.findByIdAndDelete(userId);

  if (!deletedUser) {
    return next(createHttpError(404, 'User not found'));
  }

  res.send({ data: deletedUser });
};
