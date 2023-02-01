const usersRouter = require('express').Router();
const UserController = require('../controllers/usersController');

usersRouter
  .route('/')
  .post(UserController.createUser)
  .get(UserController.getUsers);

usersRouter
  .route('/:userId')
  .get(UserController.getUser)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser);


module.exports = usersRouter;
