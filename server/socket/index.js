const uuidv4 = require('uuid').v4;
const socketio = require('socket.io');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const keys = require('../config/keys');
const User = mongoose.model('User');

const users = [];
const messages = [];
const defaultUser = {
  id: 'anon',
  name: 'Anonymous'
};

const findUserById = id => users.find(x => x.id === id);
const findUserBySocketId = socketId => users.find(x => x.socketId == socketId);

const authHandler = async (socket, next) => {
  const { token = null } = socket.handshake.query || {};
  if (token) {
    try {
      const [authType, tokenValue] = token.trim().split(' ');
      if (authType !== 'Bearer' || !tokenValue) {
        throw new Error('Expected a Bearer token');
      }

      const { secret } = keys.jwt;
      const payload = jwt.verify(tokenValue, secret);
      const id = payload.id.toString();
      const user = await User.findById(id);

      const u = {
        id,
        role: user?.role,
        isAdmin: user.role === 'ROLE_ADMIN',
        name: `${user?.firstName} ${user?.lastName}`,
        socketId: socket.id
      };
      const existingUser = findUserById(id);

      if (!existingUser) {
        users.push(u);
      } else {
        existingUser.socketId = socket.id;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  next();
};

class Connection {
  constructor(io, socket) {
    this.socket = socket;
    this.io = io;

    socket.on('connected', () => this.getUsers());
    socket.on('getMessages', () => this.getMessages());
    socket.on('message', body => this.handleMessage(body));
    socket.on('disconnect', () => this.disconnect());
    socket.on('connect_error', err => {
      console.log(`connect_error due to ${err.message}`);
    });
  }

  sendMessage(message) {
    this.io.sockets.emit('message', message);
  }

  getMessages() {
    const user = findUserBySocketId(this.socket.id);
    const sentMsgs = messages.filter(m => m.from === user.id);
    const receivedMsgs = messages.filter(m => m.to === user.id);

    this.io
      .to(this.socket.id)
      .emit('getMessages', [...sentMsgs, ...receivedMsgs]);
  }

  getUsers() {
    const user = findUserBySocketId(this.socket.id);

    if (user) {
      user.online = true;
    }

    const notMe = users.filter(x => x.socketId !== this.socket.id);
    const adminUsers = users.filter(x => x.isAdmin === true);
    this.io
      .to(this.socket.id)
      .emit('getUsers', user?.isAdmin ? notMe : adminUsers);
  }

  handleMessage(body) {
    const { text, to } = body;
    const user = findUserBySocketId(this.socket.id);
    const user_to = findUserById(to);

    const message = {
      id: uuidv4(),
      value: text,
      time: Date.now(),
      user: user || defaultUser,
      from: user.id,
      to: user_to?.id
    };
    this.io.to(user_to.socketId).emit('message', message);
    this.io.to(user.socketId).emit('message', message);
    messages.push(message);
  }

  disconnect() {
    const user = users.find(x => x.socketId === this.socket.id);
    if (user) {
      user.online = false;
    }
  }
}

function chat(server) {
  const io = socketio(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.use(authHandler);
  io.on('connection', socket => {
    new Connection(io, socket);
  });
}

module.exports = chat;
