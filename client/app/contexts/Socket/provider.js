import React, { useEffect, useState } from 'react';

import io from 'socket.io-client';

import SocketContext from './context';
import { SOCKET_URL } from '../../constants';

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const sk = io(SOCKET_URL, token && { query: { token } });
    setSocket(sk);
    return () => sk.close();
  }, [setSocket, token]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
