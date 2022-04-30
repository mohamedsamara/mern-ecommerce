import React, { useEffect, useRef, memo } from 'react';

import { getMemoizedRandomColors } from '../../../helpers';
import { formatTime } from '../../../helpers/date';
import NotFound from '../../Common/NotFound';

const MessagesList = props => {
  const { user, messages } = props;
  const messagesEndRef = useRef(null);
  const msgsL = messages.length > 0 ? true : false;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const renderMessages = () =>
    messages.map(message => (
      <Message
        key={message.id}
        message={message}
        isMe={message.from === user._id}
        noHeader={message.noHeader}
      />
    ));

  return (
    <>
      {messages && msgsL ? (
        <div className={`m-list ${msgsL ? '' : 'empty'}`}>
          {renderMessages()}
          <div ref={messagesEndRef} />
          <div className='chat-bg' />
        </div>
      ) : (
        <div className='my-4'>
          <NotFound message='No messages found' />
        </div>
      )}
    </>
  );
};

const Message = memo(props => {
  const { message, isMe, noHeader } = props;

  const getAvatar = m => {
    const color = getMemoizedRandomColors(m.from);

    if (m.user.name) {
      return (
        <div
          className='d-flex flex-column justify-content-center align-items-center fw-1 text-white avatar '
          style={{ backgroundColor: color ? color : 'red' }}
        >
          {m.user.name.charAt(0)}
        </div>
      );
    }
  };

  return (
    <div className='m-container'>
      <div
        className={`d-flex ${
          isMe ? 'justify-content-end' : 'justify-content-start'
        }`}
      >
        {!isMe && (
          <div className='mx-3 avatar-box'>
            {!noHeader && <> {getAvatar(message)}</>}
          </div>
        )}

        <div>
          {isMe ? (
            <div className='mb-2 text-right text-black'>
              {formatTime(message.time)}
            </div>
          ) : (
            <div className={`d-flex mb-2 text-right`}>
              {!noHeader && (
                <>
                  <p className={`mb-0 fw-1 text-black`}>{message.user.name}</p>
                  <div className='ml-2 text-black'>
                    {formatTime(message.time)}
                  </div>
                </>
              )}
            </div>
          )}

          <p className={`${isMe ? 'me' : ''} m-box`}>{message.value}</p>
        </div>
      </div>
    </div>
  );
});

export default MessagesList;
