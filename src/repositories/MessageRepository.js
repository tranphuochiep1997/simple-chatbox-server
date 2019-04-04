const { Message, User } = require('../db/models/index');
const Repository = require('./Repository');

class MessageRepository extends Repository {
  constructor() {
    super(Message);
  }

  getAll({ page, limit }) {
    const include = [
      {
        model: User,
        as: 'owner'
      }
    ];

    const order = [['id', 'ASC']]

    return super.getAll({ page, limit, include, order });
  }
}

module.exports = MessageRepository;
