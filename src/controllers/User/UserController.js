const UserController = require('express').Router();
const userService = require('../../services/UserService');
const { errors, logger, jsonError } = require('../../utils/system');
const { authenticated } = require('../../middlewares/policies');

UserController.base = '/users';

UserController.get('/', [
  authenticated()
], (req, res) => {
  userService.getAll(req.query)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      logger.error(err);
      res.json(jsonError(errors.SYSTEM_ERROR));
    })
});

UserController.get('/me', [
  authenticated()
], (req, res) => {
  userService.getById(req.principal.ownerId)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      logger.error(err);
      res.json(jsonError(errors.SYSTEM_ERROR));
    })
});

module.exports = UserController;

