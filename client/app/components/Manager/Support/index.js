import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';

import { useSocket } from '../../../contexts/Socket';
import AddMessage from './AddMessage';
import MessageList from './MessageList';
import UserList from './UserList';
import NotFound from '../../Common/NotFound';

const Support = props => {
  const { user } = props;
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatMsgs, setChatMsgs] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.emit('connected');
      socket.emit('getMessages');
      socket.on('getUsers', users => {
        setUsers(users);
      });
      socket.on('getMessages', msgs => {
        msgs.map(m => onMessage(m));
      });
    }
  }, [socket]);

  useEffect(() => {
    if (users && !selectedUser) {
      const u = users[0];
      setSelectedUser(u);
      setUserMsgs(u);
    } else if (users && messages.length > 0) {
      setUserMsgs(selectedUser);
    }
  }, [users, messages]);

  useEffect(() => {
    if (socket) {
      socket.on('message', onMessage);
    }
  }, [socket]);

  const onMessage = message => {
    setMessages(prevState => [...prevState, message]);
  };

  const handleSelectUser = u => {
    setSelectedUser(u);
    setUserMsgs(u);
  };

  const setUserMsgs = u => {
    const foundUser = users.find(u => u.id === u.id);
    if (foundUser && messages && messages.length) {
      const sentMsgs = messages.filter(m => m.from === u.id);
      const receivedMsgs = messages.filter(m => m.to === u.id);
      const msgs = [...sentMsgs, ...receivedMsgs].sort(
        (a, b) => a.time - b.time
      );

      const updatedMsgs = [];

      for (let i = 0; i < msgs.length; i++) {
        const previousMsg = msgs[i - 1];
        const currentMsg = msgs[i];

        if (previousMsg && previousMsg.from === currentMsg.from && i !== 0) {
          currentMsg.noHeader = true;
        } else {
          currentMsg.noHeader = false;
        }

        updatedMsgs.push(currentMsg);
      }

      setChatMsgs(updatedMsgs);
    }
  };

  const onMessageSubmit = message => {
    socket.emit('message', {
      text: message,
      to: selectedUser?.id
    });
  };

  return (
    <Row>
      <Col xs='12' md='4' xl='3'>
        <UserList
          user={user}
          users={users}
          selectedUser={selectedUser}
          selectUser={handleSelectUser}
        />
      </Col>
      <Col xs='12' md='8' xl='9'>
        {socket ? (
          <div>
            <h2>{selectedUser?.name}</h2>
            <hr />
            <MessageList user={user} messages={chatMsgs} />
            <AddMessage socket={socket} onSubmit={onMessageSubmit} />
          </div>
        ) : (
          <NotFound message='Not Connected.' />
        )}
      </Col>
    </Row>
  );
};

export default Support;
