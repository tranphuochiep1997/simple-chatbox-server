const MessageController = require('express').Router();
const messageService = require('../../services/MessageService');
const { errors, logger, jsonError } = require('../../utils/system');
const { authenticated } = require('../../middlewares/policies');

MessageController.base = '/messages';

MessageController.get('/', [
  authenticated()
], (req, res) => {
  messageService.getAll(req.query)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      logger.error(err);
      res.json(jsonError(errors.SYSTEM_ERROR));
    })
});

module.exports = MessageController;

