import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';

import { useSocket } from '../../../contexts/Socket';
import AddMessage from './AddMessage';
import MessageList from './MessageList';
import UserList from './UserList';
import NotFound from '../../Common/NotFound';

const Support = props => {
  const { user: me } = props;
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeChat, setActiveChat] = useState([]);
  const { socket, connect, disconnect } = useSocket();

  useEffect(() => {
    connect();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit('connectUser');
      socket.emit('getUsers');
      socket.emit('getMessages');
      socket.on('getUsers', users => {
        setUsers(users);
      });
      socket.on('getMessages', msgs => {
        setMessages(prevState => [...prevState, ...msgs]);
      });
      socket.on('message', onMessage);
    }

    return () => {
      disconnect();
    };
  }, [socket]);

  /* user connect/disconnect implementation */
  useEffect(() => {
    if (socket && users) {
      socket.on('connectUser', user => {
        const index = users.findIndex(u => u.id === user.id);
        let newUsers = [...users];
        if (index !== -1) {
          newUsers[index] = user;
        } else {
          newUsers = [...newUsers, user];
        }
        setUsers(newUsers);
      });

      socket.on('disconnectUser', user => {
        const index = users.findIndex(u => u.id === user.id);
        const newUsers = [...users];
        if (index !== -1) {
          newUsers[index] = user;
        }
        setUsers(newUsers);
      });
    }
  }, [socket, users]);

  useEffect(() => {
    if (messages.length > 0) {
      if (selectedUser) {
        selectUser(selectedUser);
      } else {
        const user_id = localStorage.getItem('selected_suport_chat');
        if (user_id) {
          const user = users.find(u => u.id === user_id);
          if (user) selectUser(user);
        }
      }
    }
  }, [messages]);

  const onMessage = message => {
    setMessages(prevState => [...prevState, message]);
  };

  const selectUser = user => {
    setSelectedUser(user);
    const msgs = getUserMsgs(user);
    setActiveChat(msgs);
    localStorage.setItem('selected_suport_chat', user.id);
  };

  const getUserMsgs = user => {
    const sentMsgs = messages.filter(m => m.from === user.id);
    const receivedMsgs = messages.filter(m => m.to === user.id);
    const msgs = [...sentMsgs, ...receivedMsgs].sort((a, b) => a.time - b.time);
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
    return updatedMsgs;
  };

  const onMessageSubmit = message => {
    if (!selectedUser) return;
    socket.emit('message', {
      text: message,
      to: selectedUser?.id
    });
  };

  return (
    <>
      {socket ? (
        <>
          {users.length > 0 ? (
            <Row>
              <Col xs='12' md='4' xl='3'>
                <UserList
                  users={users}
                  selectedUser={selectedUser}
                  selectUser={selectUser}
                />
              </Col>
              <Col xs='12' md='8' xl='9'>
                {selectedUser ? (
                  <div>
                    <h4 className='text-center text-md-left mt-3 mt-md-0'>
                      {selectedUser?.name}
                    </h4>
                    <MessageList user={me} messages={activeChat} />
                    <AddMessage socket={socket} onSubmit={onMessageSubmit} />
                  </div>
                ) : (
                  <div className='d-flex flex-column justify-content-center h-100 p-4 p-md-0'>
                    <NotFound message='Select chat to start messaging' />
                  </div>
                )}
              </Col>
            </Row>
          ) : (
            <NotFound message='Not users connected.' />
          )}
        </>
      ) : (
        <NotFound message='Not Connected.' />
      )}
    </>
  );
};

export default Support;
