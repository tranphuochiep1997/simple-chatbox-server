const { Message } = require('../db/models/index');
const Repository = require('./Repository');

class MessageRepository extends Repository {
  constructor() {
    super(Message);
  }
}

module.exports = MessageRepository;
