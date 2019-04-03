const UserRepository = require('../repositories/UserRepository');
const { errors, jsonSuccess, jsonError } = require('../utils/system');
const { hashPassword, comparePassword } = require('../utils/encryption');
const Jwt = require('../utils/jwt');

class AuthService {

  constructor() {
    this.userRepository = new UserRepository();
  }

  /**
   * 
   * @param {string} username 
   * @param {string} password
   * @param {string} name
   */
  async register({ username, password, name }) {
    try {

      /** Check username used */
      let user = await this.userRepository.getByUsername(username);
      if (user) {
        return jsonError(errors.USERNAME_EXISTED);
      }

      /** Hash password */
      password = await hashPassword(password);

      /** Create user */
      await this.userRepository.create({ username, password, name });

      return jsonSuccess();
    } catch (e) {
      throw e;
    }
  }

  /**
   * 
   * @param {string} username 
   * @param {string} password
   */
  async login({ username, password }) {
    try {

      /** Check username */
      const user = await this.userRepository.getByUsernameIncludePassword(username);
      if (!user) {
        return jsonError(errors.INVALID_CREDENTIALS);
      }

      /** Compare password */
      const isEqual = await comparePassword(password, user.password);
      if (!isEqual) {
        return jsonError(errors.INVALID_CREDENTIALS);
      }

      /** Generate token */
      const tokenResult = await Jwt.sign({ ownerId: user.id, role: user.role });
      if (!tokenResult.success) {
        return tokenResult;
      }

      delete user.password;
      return jsonSuccess({ user, accessToken: tokenResult.result});
    } catch (e) {
      throw e;
    }
  }
}

module.exports = new AuthService();

