import React, { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';
import { useSelector } from 'react-redux';

const ENDPOINT =
  window.location.host.indexOf('localhost') >= 0
    ? 'http://127.0.0.1:5000'
    : window.location.host;

export default function ChatBox(props) {
  const [userInfo] = useState(props.user);
  const [socket, setSocket] = useState(null);
  const uiMessagesRef = useRef(null);
  const [messageBody, setMessageBody] = useState('');
  const [messages, setMessages] = useState([
    { name: 'Admin', body: 'Hello there, Please ask your question.' },
  ]);

  useEffect(() => {
    if (uiMessagesRef.current) {
      uiMessagesRef.current.scrollBy({
        top: uiMessagesRef.current.clientHeight,
        left: 0,
        behavior: 'smooth',
      });
    }
    if (socket) {
      socket.emit('connected', {
        _id: userInfo._id,
        name: userInfo.firstName + ' ' + userInfo.lastName,
        isAdmin: userInfo.role == 'ROLE_ADMIN' ? true : false,
      });
      socket.on('message', (data) => {
        setMessages([...messages, { body: data.body, name: data.name }]);
      });
    }
  }, [messages, userInfo, socket]);

  const supportHandler = () => {
    const sk = socketIOClient(ENDPOINT);
    setSocket(sk);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!messageBody.trim()) {
      alert('Error. Please type message.');
    } else {
      setMessages([...messages, { body: messageBody, name: userInfo.firstName + ' ' + userInfo.lastName }]);
      setMessageBody('');
      setTimeout(() => {
        socket.emit('onMessage', {
          body: messageBody,
          name: userInfo.firstName + ' ' + userInfo.lastName,
          isAdmin: userInfo.role == 'ROLE_ADMIN' ? true : false,
          _id: userInfo._id,
        });
      }, 1000);
    }
  };

  return (
    <div className="chatBody">
        <div className="support-container">
          <div className="content-header">
            <strong className="current-chatting-user"><h3>Chat with Admin</h3></strong>
          </div>
          <ul ref={uiMessagesRef}  className="content-body"><div  className="chat-items">
            {messages.map((msg, index) => (
              <li key={index}>
              <div style={{ animationDelay: `0.8s` }}
                className={`chat-item ${msg.name !== 'Admin' ? "me" : "other"}`}>
                <div className="chat-item-content">
                  <strong>{`${msg.name}: `}</strong>
                  <div className="chat-msg"> {msg.body} </div>
                </div>
              </div>
              </li>
            ))}
            </div>
          </ul>
          <div className="content-footer">
            <form onSubmit={submitHandler}  onClick={supportHandler} className="sendNewMessage">
              <input
                value={messageBody}
                onChange={(e) => setMessageBody(e.target.value)}
                type="text"
                placeholder="type message"
              />
              <button className="btnSendMsg" id="sendMsgBtn" type="submit">
                <i className="fa fa-paper-plane">   Send </i>
              </button>
            </form>
          </div>
        </div>
    </div>
  );
}
