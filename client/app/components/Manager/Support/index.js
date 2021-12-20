import React, { useEffect, useRef, useState } from 'react';
import { Row, Col } from 'reactstrap';
import socketIOClient from 'socket.io-client';

import { SOCKET_URL, ROLE_ADMIN } from '../../../constants';

import AddMessage from './AddMessage';
import MessageList from './MessageList';
import UsersList from './UsersList';

const Support = props => {
  const { user } = props;
  const initialMessages =
    user.role === 'ROLE_ADMIIN'
      ? [
          {
            name: 'Admin',
            body: 'Hello there, Please ask your question.'
          }
        ]
      : [];
  const [selectedUser, setSelectedUser] = useState(null);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState(initialMessages);
  const [users, setUsers] = useState([]);

  // const uiMessagesRef = useRef(null);

  useEffect(() => {
    // if (uiMessagesRef.current) {
    //   uiMessagesRef.current.scrollBy({
    //     top: uiMessagesRef.current.clientHeight,
    //     left: 0,
    //     behavior: 'smooth'
    //   });
    // }

    if (!socket) {
      const sk = socketIOClient(SOCKET_URL);
      setSocket(sk);

      sk.emit('connected', {
        _id: user._id,
        name:
          user.role === ROLE_ADMIN
            ? 'Admin'
            : user.firstName + ' ' + user.lastName,
        isAdmin: user.role === ROLE_ADMIN ? true : false
      });

      sk.on('message', message => {
        const selectedUser = users.find(u => u._id === message._id);

        if (selectedUser) {
          setMessages([...messages, message]);
        } else {
          const existUser = users.find(user => user._id === data._id);
          if (existUser) {
            const newUsers = users.map(user =>
              user._id === existUser._id ? { ...user, unread: true } : user
            );
            setUsers(newUsers);
          }
        }
      });

      if (user.role === ROLE_ADMIN) {
        sk.on('updateUser', updatedUser => {
          const existUser = users.find(user => user._id === updatedUser._id);
          if (existUser) {
            const newUsers = users.map(user =>
              user._id === existUser._id ? updatedUser : user
            );
            setUsers(newUsers);
          } else {
            setUsers([...users, updatedUser]);
          }
        });
        sk.on('listUsers', users => {
          console.log('users --- listUsers', users);
          setUsers(users);
        });
        sk.on('selectUser', user => {
          const { messages } = user;
          setMessages(messages);
        });
      }
    }
  }, [socket, messages, users]);

  const handleSelectUser = user => {
    setSelectedUser(user);

    const existUser = users.find(x => x._id === user._id);

    if (existUser) {
      const newUsers = users.map(x =>
        x._id === existUser._id ? { ...x, unread: false } : x
      );
      setUsers(newUsers);
    }

    socket.emit('onUserSelected', user);
  };

  const onSubmit = message => {
    setMessages([
      ...messages,
      {
        body: message,
        name:
          user.role === ROLE_ADMIN
            ? 'Admin'
            : user.firstName + ' ' + user.lastName
      }
    ]);
    setTimeout(() => {
      socket.emit('onMessage', {
        body: message,
        name:
          user.role == ROLE_ADMIN
            ? 'Admin'
            : user.firstName + ' ' + user.lastName,
        isAdmin: user.role == ROLE_ADMIN ? true : false,
        _id: user.role === ROLE_ADMIN ? selectedUser._id : user._id
      });
    }, 1000);
  };

  return (
    <Row>
      <Col xs='12' md='12' xl='3'>
        <UsersList
          user={user}
          users={users}
          selectedUser={selectedUser}
          selectUser={handleSelectUser}
        />
      </Col>
      <Col xs='12' md='12' xl='9'>
        <MessageList messages={messages} />
        <AddMessage onSubmit={onSubmit} />
      </Col>
    </Row>
  );
};

export default Support;
