const jwt = require('jsonwebtoken');
const { jsonError, jsonSuccess, errors } = require('./system');

class Jwt {
  static sign(data) {
    return new Promise(resolve => {
      jwt.sign(data, getEnv('JWT_SECRET'), { expiresIn: getEnv('JWT_EXPIRE_TIME') }, (err, token) => {
        if (err) {
          return resolve(jsonError(errors.SYSTEM_ERROR));
        }
        return resolve(jsonSuccess(token));
      });
    });
  }

  static verify(token) {
    return new Promise(resolve => {
      jwt.verify(token, getEnv('JWT_SECRET'), (error, decode) => {
        if (error) {
          switch (error.message) {
            case 'jwt expired':
              error = errors.TOKEN_EXPIRED_ERROR;
              break;

            default:
              error = errors.INVALID_TOKEN;
          }

          return resolve(jsonError(error));
        }
        return resolve(jsonSuccess(decode));
      });
    });
  }
}

module.exports = Jwt;

