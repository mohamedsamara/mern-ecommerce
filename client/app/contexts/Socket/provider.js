import React, { useState } from 'react';

import io from 'socket.io-client';

import SocketContext from './context';
import { SOCKET_URL } from '../../constants';

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const connect = () => {
    const token = localStorage.getItem('token');
    const sk = io(SOCKET_URL, {
      autoConnect: false
    });

    if (token) {
      sk.auth = { token };
      sk.connect();
      sk.auth;
      setSocket(sk);
    }
  };

  const disconnect = () => {
    if (socket) {
      socket.close();
    }
  };

  return (
    <SocketContext.Provider value={{ socket, connect, disconnect }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
