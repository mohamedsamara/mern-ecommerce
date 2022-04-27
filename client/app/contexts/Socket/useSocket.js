import { useContext } from 'react';

import SocketContext from './context';

const useSocket = () => useContext(SocketContext);

export default useSocket;
