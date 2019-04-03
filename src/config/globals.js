const { logger } = require('../utils/system');;

const globalFunction = () => {
  global.env = Object.assign({}, process.env);
  logger.info(`Current environment: ${global.env.NODE_ENV || 'development'}`);
  
  global.getEnv = (key) => {
    return global.env[key]
  }
}

module.exports = {
  globalFunction
}