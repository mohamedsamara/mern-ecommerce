import React from 'react';

import MessageBox from './MessageBox';

const UserList = props => {
  const { users, selectedUser, selectUser } = props;
  if (!users) return null;

  const _selectUser = u => {
    selectUser(u);
  };

  return (
    <ul>
      {users.map((u, i) => {
        const isSelected = selectedUser?.id === u.id;

        return (
          <li
            style={{
              backgroundColor: isSelected ? 'whitesmoke' : 'transparent'
            }}
            key={i}
            onClick={() => _selectUser(u)}
          >
            {u.name}
          </li>
        );
      })}
    </ul>
  );

  // return (
  //   <>
  //     {users.filter(x => x._id !== user._id).length === 0 && (
  //       <MessageBox>No Online User Found</MessageBox>
  //     )}
  //     <ul>
  //       {users
  //         .filter(x => x._id !== user._id)
  //         .map((user, index) => (
  //           <li
  //             style={{ animationDelay: `0.2s` }}
  //             key={index}
  //             className={
  //               user._id === selectedUser?._id
  //                 ? `chatlist-item active `
  //                 : 'chatlist-item'
  //             }
  //           >
  //             <button
  //               className='block'
  //               type='button'
  //               onClick={() => selectUser(user)}
  //             >
  //               {user.name}
  //             </button>
  //             <div>
  //               <span
  //                 className={
  //                   user.unread ? 'unread' : user.online ? 'online' : 'offline'
  //                 }
  //               />
  //             </div>
  //           </li>
  //         ))}
  //     </ul>
  //   </>
  // );
};

export default UserList;
