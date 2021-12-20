import React from 'react';

const MessageList = props => {
  const { messages } = props;

  return (
    <ul>
      {messages.length === 0 && <li>No message.</li>}

      <div>
        {messages.map((msg, index) => (
          <li key={index}>
            <div
              style={{ animationDelay: `0.8s` }}
              //   className={`chat-item ${msg.name == 'Admin' ? 'me' : 'other'}`}
            >
              <div>
                <strong>{`${msg.name}: `}</strong>
                <div className='chat-msg'> {msg.body} </div>
              </div>
            </div>
          </li>
        ))}
      </div>
    </ul>
  );
};

export default MessageList;
