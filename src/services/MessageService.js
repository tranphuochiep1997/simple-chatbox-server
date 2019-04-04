const MessageRepository = require('../repositories/MessageRepository');
const Service = require('./Service');

class MessageService extends Service {

  constructor() {
    super(MessageRepository)
  }
}

module.exports = new MessageService();

