const express = require('express');
const cors = require('cors');
const passport = require('passport');

const app = express();
const server = require('http').createServer(app);
const socketIo = require('socket.io');
const { ipAdress } = require('./conf');

const io = socketIo(server, {
  cors: {
    origin: ipAdress,
  },
});
const { backPort, db } = require('./conf');
const { setupRoutes } = require('./routes');

app.use(passport.initialize());

app.use(cors());

app.use(express.json());

setupRoutes(app);

// CHAT
let messages = [];
const addMessage = (data) => {
  const newMsg = {
    time: new Date(),
    ...data,
  };
  db.query(
    'INSERT INTO Messages (userId,content,time,picture,firstname,lastname) VALUES (?,?,?,?,?,?)',
    [
      newMsg.userId,
      newMsg.content,
      newMsg.time,
      newMsg.picture,
      newMsg.firstname,
      newMsg.lastname,
    ]
  );
  messages.push(newMsg);
  io.emit('listMsg', messages);
};

io.on('connection', async (socket) => {
  [messages] = await db.query('SELECT * FROM Messages');
  socket.emit('listMsg', messages);
  socket.on('sendMsg', (data) => {
    addMessage(data);
  });
});

server.listen(8080, () => {
  console.log('API listening on http://localhost:8080');
});

app.use('/', (req, res) => {
  res.status(404).send('Route not found! ');
});

app.listen(backPort, () => {
  console.log(`Eazyapp API now available on http://localhost:${backPort} !`);
});
