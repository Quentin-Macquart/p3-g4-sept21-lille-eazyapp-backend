const express = require('express');
const cors = require('cors');
const passport = require('passport');

const app = express();
app.use(passport.initialize());
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://192.168.1.23:3000',
  },
});
const { backPort, db } = require('./conf');
const { setupRoutes } = require('./routes');

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
  db.query('INSERT INTO Messages (userId,content,time) VALUES (?,?,?)', [
    newMsg.author,
    newMsg.content,
    newMsg.time,
  ]);
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
