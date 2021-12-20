import React from 'react';

import MessageBox from './MessageBox';

const UsersList = props => {
  const { user, users, selectedUser, selectUser } = props;

  return (
    <>
      {users.filter(x => x._id !== user._id).length === 0 && (
        <MessageBox>No Online User Found</MessageBox>
      )}
      <ul>
        {users
          .filter(x => x._id !== user._id)
          .map((user, index) => (
            <li
              style={{ animationDelay: `0.2s` }}
              key={index}
              className={
                user._id === selectedUser?._id
                  ? `chatlist-item active `
                  : 'chatlist-item'
              }
            >
              <button
                className='block'
                type='button'
                onClick={() => selectUser(user)}
              >
                {user.name}
              </button>
              <div>
                <span
                  className={
                    user.unread ? 'unread' : user.online ? 'online' : 'offline'
                  }
                />
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};

export default UsersList;
