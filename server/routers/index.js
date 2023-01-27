const rootRouter = require('express').Router();
const usersRouter = require('./usersRouter');

rootRouter.use('/users', usersRouter);

module.exports = rootRouter;