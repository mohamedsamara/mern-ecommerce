import React from 'react';

const MessagesList = props => {
  const { user, messages } = props;

  return (
    <div className='m-list'>
      {messages &&
        messages.length > 0 &&
        messages
          .sort((a, b) => a.time - b.time)
          .map(message => {
            const isMe = message.from === user._id;

            return (
              <div
                key={message.id}
                className='message-container'
                title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}
                style={{ backgroundColor: isMe ? '#2962ff' : '#e4e6eb' }}
              >
                <span
                  className='user'
                  style={{ color: isMe ? 'white' : 'black' }}
                >
                  {isMe ? 'You' : message.user.name}:
                </span>
                <span
                  className='message'
                  style={{ color: isMe ? 'white' : 'black' }}
                >
                  {message.value}
                </span>
                {/* <span className='date'> */}
                {/* {new Date(message.time).toLocaleTimeString()} */}
                {/* </span> */}
              </div>
            );
          })}
    </div>
  );
};

export default MessagesList;
