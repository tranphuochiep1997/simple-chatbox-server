const authService = require('../../services/AuthService');
const { logger, jsonError, errors } = require('../../utils/system');
const registerValidation = require('../../validations/auth/register');
const loginValidation = require('../../validations/auth/login');

const AuthController = require('express').Router();

AuthController.base = '/auth';

AuthController.post('/register', [
  registerValidation
], (req, res) => {
  authService.register(req.body)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      logger.error(err);
      res.json(jsonError(errors.SYSTEM_ERROR));
    })
});

AuthController.post('/login', [
  loginValidation
], (req, res) => {
  authService.login(req.body)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      logger.error(err);
      res.json(jsonError(errors.SYSTEM_ERROR));
    })
});

module.exports = AuthController;

