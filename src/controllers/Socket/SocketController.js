const { socketAuthenticated } = require('../../middlewares/policies');
const messageService = require('../../services/MessageService');

const socketHandler = (io) => {
  io.use(socketAuthenticated());
  io.on('connection', onConnect);
}

const onConnect = (socket) => {
  const { ownerId } = socket.principal;

  socket.on('message', (body) => {

    if (body) {
    /** Save db */
    messageService.create({ ownerId, body })
      .then(response => {
        if(response.success) {
          return socket.emit('message', response.result);
        }

        throw new Error(JSON.stringify(response));
      })
    }
  });
};

module.exports = socketHandler;
