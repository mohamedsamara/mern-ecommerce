import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import socketIOClient from 'socket.io-client';
import { useSelector } from 'react-redux';
import MessageBox from './MessageBox';

let allUsers = [];
let allMessages = [];
let allSelectedUser = {};
const ENDPOINT =
  window.location.host.indexOf('localhost') >= 0
    ? 'http://127.0.0.1:5000'
    : window.location.host;

export default function SupportScreen(props) {
  const [selectedUser, setSelectedUser] = useState({});
  const [socket, setSocket] = useState(null);
  const uiMessagesRef = useRef(null);
  const [messageBody, setMessageBody] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const userInfo = props.user;

  useEffect(() => {
    if (uiMessagesRef.current) {
      uiMessagesRef.current.scrollBy({
        top: uiMessagesRef.current.clientHeight,
        left: 0,
        behavior: 'smooth',
      });
    }

    if (!socket) {
      const sk = socketIOClient(ENDPOINT);
      setSocket(sk);
      sk.emit('connected', {
        _id: userInfo._id,
        name:  userInfo.role == 'ROLE_ADMIN' ? 'Admin' : userInfo.firstName + ' ' + userInfo.lastName,
        isAdmin: userInfo.role == 'ROLE_ADMIN' ? true : false,
      });
      sk.on('message', (data) => {
        if (allSelectedUser._id === data._id) {
          allMessages = [...allMessages, data];
        } else {
          const existUser = allUsers.find((user) => user._id === data._id);
          if (existUser) {
            allUsers = allUsers.map((user) =>
              user._id === existUser._id ? { ...user, unread: true } : user
            );
            setUsers(allUsers);
          }
        }
        setMessages(allMessages);
      });
      sk.on('updateUser', (updatedUser) => {
        const existUser = allUsers.find((user) => user._id === updatedUser._id);
        if (existUser) {
          allUsers = allUsers.map((user) =>
          user._id === existUser._id ? updatedUser : user
          );
          setUsers(allUsers);
        } else {
          allUsers = [...allUsers, updatedUser];
          setUsers(allUsers);
        }
      });
      sk.on('listUsers', (updatedUsers) => {
        allUsers = updatedUsers;
        setUsers(allUsers);
      });
      sk.on('selectUser', (user) => {
        allMessages = user.messages;
        setMessages(allMessages);
      });
    }
  }, [messages, socket, users]);

  const selectUser = (user) => {
    allSelectedUser = user;
    setSelectedUser(allSelectedUser);
    const existUser = allUsers.find((x) => x._id === user._id);
    if (existUser) {
      allUsers = allUsers.map((x) =>
      x._id === existUser._id ? { ...x, unread: false } : x
      );
      setUsers(allUsers);
    }
    socket.emit('onUserSelected', user);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!messageBody.trim()) {
      alert('Error. Please type message.');
    } else {
      allMessages = [
        ...allMessages,
        { body: messageBody, name:  userInfo.role == 'ROLE_ADMIN' ? 'Admin' : userInfo.firstName + ' ' + userInfo.lastName },
      ];
      setMessages(allMessages);
      setMessageBody('');
      setTimeout(() => {
        socket.emit('onMessage', {
          body: messageBody,
          name:  userInfo.role == 'ROLE_ADMIN' ? 'Admin' : userInfo.firstName + ' ' + userInfo.lastName,
          isAdmin: userInfo.role == 'ROLE_ADMIN' ? true : false,
          _id: selectedUser._id,
        });
      }, 1000);
    }
  };

  return (
    <div className="card card-body">
      <Row>
          <Col  xs='3' md='3' xl='3' className="support-users">
            {users.filter((x) => x._id !== userInfo._id).length === 0 && (
              <MessageBox>No Online User Found</MessageBox>
            )}
            <ul style={{marginTop: '13px', marginBottom: '1rem'}}>
              {users
                .filter((x) => x._id !== userInfo._id)
                .map((user) => (
                  <li
                    key={user._id}
                    className={user._id === selectedUser._id ? '  selected' : '  '}
                  >
                    <button
                      className="block"
                      type="button"
                      onClick={() => selectUser(user)}
                    >
                      {user.name}
                    </button>
                    <span
                      className={
                        user.unread ? 'unread' : user.online ? 'online' : 'offline'
                      }
                    />
                  </li>
                ))}
            </ul>
          </Col>
          <Col  xs='9' md='9' xl='9' className="support-messages">
            {!selectedUser._id ? (
              <MessageBox>Select a user to start chat</MessageBox>
            ) : (
              <div>
                <div className="row">
                  <strong><h3>Chat with {selectedUser.name}</h3></strong>
                </div>
                <ul ref={uiMessagesRef}>
                  {messages.length === 0 && <li>No message.</li>}
                  {messages.map((msg, index) => (
                    <li key={index}>
                      <strong>{`${msg.name}: `}</strong> {msg.body}
                    </li>
                  ))}
                </ul>
                <div>
                  <form onSubmit={submitHandler} className="row">
                    <input
                      value={messageBody}
                      onChange={(e) => setMessageBody(e.target.value)}
                      type="text"
                      placeholder="type message"
                    />
                    <button className='chatButton' type="submit">Send</button>
                  </form>
                </div>
              </div>
            )}
          </Col>
      </Row>
    </div>
  );
}
