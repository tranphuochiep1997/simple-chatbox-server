const colors = require('colors');

const jsonSuccess = (result = null) => {
  return { success: true, result };
}

const jsonError = (err = null) => {
  return { success: false, error: err };
}

const logger = {
  verbose: message => {
    return console.log(colors['gray'](`[VERB] ${JSON.stringify(message)}`));
  },
  warn: message => {
    if (getEnv('FULL_LOG') !== 'true') return;
    return console.log(colors['yellow'](`[WARN] ${JSON.stringify(message)}`));
  },
  error: message => {
    console.log(message);
    return console.log(colors['red'](`[ERROR] ${JSON.stringify(message)}`));
  },
  info: message => {
    return console.log(`[INFO] ${JSON.stringify(message)}`);
  }
}

const errors = {
  SYSTEM_ERROR: {
    code: 1,
    message: 'SYSTEM_ERROR'
  },
  NOT_AUTHENTICATED_ERROR: {
    code: 2,
    message: 'NOT_AUTHENTICATED_ERROR'
  },
  INVALID_TOKEN: {
    code: 3,
    message: 'INVALID_TOKEN'
  },
  TOKEN_EXPIRED_ERROR: {
    code: 4,
    message: 'TOKEN_EXPIRED_ERROR'
  },
  NOT_FOUND_ERROR: {
    code: 5,
    message: 'NOT_FOUND_ERROR'
  },
  USERNAME_IS_REQUIRED: {
    code: 6,
    message: 'USERNAME_IS_REQUIRED'
  },
  PASSWORD_IS_REQUIRED: {
    code: 7,
    message: 'PASSWORD_IS_REQUIRED'
  },
  INVALID_CREDENTIALS: {
    code: 8,
    message: 'INVALID_CREDENTIALS'
  },
  USERNAME_EXISTED: {
    code: 9,
    message: 'USERNAME_EXISTED'
  },
}


module.exports = {
  logger,
  jsonSuccess,
  jsonError,
  errors
}