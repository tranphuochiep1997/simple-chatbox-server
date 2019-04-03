const { socketAuthenticated } = require('../../middlewares/policies');

const socketHandler = (io) => {
  io.use(socketAuthenticated());
  io.on('connection', onConnect);
}

const onConnect = (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.emit('message', { message: 'Hello client' });

  socket.emit('give-me-a-message', { condition: 'in-capital' }, (messageFromClient) => {
    console.log(messageFromClient);
  });

  socket.on('message', data => {
    console.log(data);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnect: ${socket.id}`);
  });
};

module.exports = socketHandler;
