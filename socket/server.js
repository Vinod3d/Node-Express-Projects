import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

// Initiate socket.io and attach it to the HTTP server
const io = new Server(server);

app.use(express.static('public'))



const users = new Set();

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join', (userName) => {
    users.add(userName)

    io.emit('userJoined', userName);
    io.emit('userList', Array.from(users))
  });
});


server.listen(3000, () => {
    console.log('Server is running on port 3000');
});