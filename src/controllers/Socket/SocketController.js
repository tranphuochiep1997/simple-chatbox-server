const { socketAuthenticated } = require('../../middlewares/policies');
const messageService = require('../../services/MessageService');

const socketHandler = (io) => {
  io.use(socketAuthenticated());
  io.on('connection', socket => onConnect({ socket, io }));
}

const onConnect = ({ socket, io }) => {
  const { ownerId } = socket.principal;

  socket.on('message', (body) => {

    if (body) {
    /** Save db */
    messageService.create({ ownerId, body })
      .then(response => {
        if(response.success) {
          return io.emit('message', response.result);
        }

        throw new Error(JSON.stringify(response));
      })
    }
  });
};

module.exports = socketHandler;
