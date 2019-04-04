const MessageRepository = require('../repositories/MessageRepository');
const UserRepository = require('../repositories/UserRepository');
const Service = require('./Service');
const { jsonSuccess } = require('../utils/system');

class MessageService extends Service {

  constructor() {
    super(MessageRepository);
    this.userRepository = new UserRepository();
  }

  async create({ ownerId, body }) {
    try {
      /** Create message and fetch owner from ownerId */
      const [ message, owner ] = await Promise.all([
        this.baseRepository.create({ ownerId, body }),
        this.userRepository.getById(ownerId)
      ]);
      message.owner = owner;
      return jsonSuccess(message);
    } catch (e) {
      throw e;
    }
  }
}

module.exports = new MessageService();

