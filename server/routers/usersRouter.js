const usersRouter = require('express').Router();
const UserController = require('../controllers/usersController');
const { checkAccessToken } = require('../middlewares/token.mw');
const messageRouter = require('./messageRouter');

usersRouter
  .route('/')
  .post(UserController.createUser)
  .get(UserController.getUsers);

usersRouter
  .route('/:userId')
  .get(UserController.getUser)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser);

usersRouter.use('/:userId/messages', checkAccessToken, messageRouter);

module.exports = usersRouter;
