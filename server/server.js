require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');

const app = require('./app');

const {
  PORT,
  SOCKET_EVENTS: { NEW_MESSAGE, NEW_MESSAGE_ERROR },
} = require('./constants');
const Message = require('./db/models/message');

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*'
  },
});

io.on('connection', (socket) => {
  // происходит при каждом подключении клиента
  console.log('client connected');

  // создадим слушатель для события нового сообщения

  socket.on(NEW_MESSAGE, async (message) => {
    try {
      // 1 сохраняем сообщение
      const newMessage = await (
        await Message.create(message)
      ).populate({ path: 'author', select: ['-password'] });

      // 2 делимся сообщением со всеми участниками
      io.emit(NEW_MESSAGE, newMessage);
    } catch (error) {
      console.log(error);
      socket.emit(NEW_MESSAGE_ERROR, error);
    }
  });

  socket.on('disconnect', (reason) => {
    console.log(`disconnected, reason: ${reason}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
