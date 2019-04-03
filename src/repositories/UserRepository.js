const { User } = require('../db/models/index');
const Repository = require('./Repository');

class UserRepository extends Repository {
  constructor() {
    super(User);
  }

  /**
   * 
   * @param {number} page 
   * @param {number} limit 
   */
  getAll({ page, limit }) {
    return super.getAll({ page, limit, attributes: { exclude: ['password'] }});
  }

  /**
   * 
   * @param {string} id 
   */
  getById(id) {
    return super.getById(id, { attributes: { exclude: ['password'] } });
  }

  /**
   * 
   * @param {string} username 
   */
  getByUsername(username) {
    return super.getOne({ username }, { attributes: { exclude: ['password'] } });
  }

  /**
   * 
   * @param {string} username 
   */
  getByUsernameIncludePassword(username) {
    return super.getOne({ username });
  }
}

module.exports = UserRepository;
