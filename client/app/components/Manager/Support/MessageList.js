import React from 'react';

import { getRandomColors } from '../../../helpers';
import { formatTime } from '../../../helpers/date';
import NotFound from '../../Common/NotFound';

const MessagesList = props => {
  const { user, messages } = props;

  const getAvatar = m => {
    const color = getRandomColors();
    if (m.user.name) {
      return (
        <div
          className='d-flex flex-column justify-content-center align-items-center fw-1 text-white avatar'
          style={{ backgroundColor: color ? color : 'red' }}
        >
          {m.user.name.charAt(0)}
        </div>
      );
    }
  };

  const msgsL = messages.length > 0 ? true : false;

  return (
    <div className={`m-list ${msgsL ? '' : 'empty'}`}>
      {messages && msgsL ? (
        messages.map(message => {
          const isMe = message.from === user._id;
          const noHeader = message.noHeader;

          return (
            <div key={message.id} className='m-container'>
              <div
                className={`d-flex flex-row ${
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
                    <div className='mb-2 text-right'>
                      {formatTime(message.time)}
                    </div>
                  ) : (
                    <div className={`d-flex flex-row mb-2 text-right`}>
                      {!noHeader && (
                        <>
                          <p className={`mb-0 text-black`}>
                            {message.user.name}
                          </p>
                          <div className='ml-2'>{formatTime(message.time)}</div>
                        </>
                      )}
                    </div>
                  )}

                  <p className={`${isMe ? 'me' : ''} m-box`}>{message.value}</p>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <NotFound message='No messages found' />
      )}
    </div>
  );
};

export default MessagesList;
