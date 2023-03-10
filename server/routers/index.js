const rootRouter = require('express').Router();
const { checkAccessToken } = require('../middlewares/token.mw');
const authRouter = require('./authRouter');
const messageRouter = require('./messageRouter');
const usersRouter = require('./usersRouter');

rootRouter.use('/users', usersRouter);
rootRouter.use('/auth', authRouter);
rootRouter.use('/messages', checkAccessToken, messageRouter);

rootRouter.get('/secret', checkAccessToken, (req, res, next) => {
  res.send('This is secret route');
});



module.exports = rootRouter;
