const { socketAuthenticated } = require('../../middlewares/policies');
const messageService = require('../../services/MessageService');

const socketHandler = (io) => {
  io.use(socketAuthenticated());
  io.on('connection', onConnect);
}

const onConnect = (socket) => {
  console.log(`User connected: ${socket.id}`);
  const { ownerId } = socket.principal;

  socket.on('message', async ({ body }) => {
    
    /** Save db */
    const response = await messageService.create({ ownerId, body });
    if (response.success) {
      socket.emit('message', response.result);
    }
  });

  socket.on('disconnect', () => {
    console.log(`User disconnect: ${socket.id}`);
  });
};

module.exports = socketHandler;
