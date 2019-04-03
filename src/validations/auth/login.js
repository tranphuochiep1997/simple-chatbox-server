const { body } = require('express-validator/check');
const { errors } = require('../../utils/system');
const { Validator } = require('../validator');

module.exports = [
  body('username')
    .exists()
    .withMessage(errors.USERNAME_IS_REQUIRED)
    .not()
    .isEmpty()
    .withMessage(errors.USERNAME_IS_REQUIRED),
  body('password')
    .exists()
    .withMessage(errors.PASSWORD_IS_REQUIRED)
    .not()
    .isEmpty()
    .withMessage(errors.PASSWORD_IS_REQUIRED),
  Validator.check()
]
