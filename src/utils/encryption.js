const bcrypt = require('bcryptjs');
const { errors, jsonError, logger } = require('./system');

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(Number(getEnv('SALT_ROUND')));
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
  } catch (e) {
    logger.error(e);
    throw jsonError(errors.SYSTEM_ERROR);
  }
};

const comparePassword = async (password, passwordHash) => {
  try {
    const isEqual = await bcrypt.compare(password, passwordHash);
    return isEqual;
  } catch (e) {
    logger.error(e);
    return false;
  }
};

module.exports = { hashPassword, comparePassword };

