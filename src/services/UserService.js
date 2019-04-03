const UserRepository = require('../repositories/UserRepository');
const Service = require('./Service');

class UserService extends Service {

  constructor() {
    super(UserRepository)
  }
}

module.exports = new UserService();

