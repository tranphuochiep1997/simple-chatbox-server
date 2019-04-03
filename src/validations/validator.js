const { validationResult } = require('express-validator/check');
const { jsonError } = require('../utils/system');

class Validator {
  static check() {
    return (req, res, next) => {
      const errors = validationResult(req);

      if (errors.isEmpty()) {
        return next();
      }

      const errorMsg = errors.array()[0].msg;

      res.json(jsonError(errorMsg));
    }
  }
}

module.exports = { Validator };

