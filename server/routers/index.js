const rootRouter = require('express').Router();
const authRouter = require('./authRouter');
const usersRouter = require('./usersRouter');

rootRouter.use('/users', usersRouter);
rootRouter.use('/auth', authRouter);

module.exports = rootRouter;
