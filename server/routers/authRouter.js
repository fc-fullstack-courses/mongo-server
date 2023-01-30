const authRouter = require('express').Router();
const AuthController = require('../controllers/authController');

authRouter.post('/registration', AuthController.registration);
authRouter.post('/login', AuthController.login);
authRouter.post('/refresh', AuthController.refresh);

module.exports = authRouter;
