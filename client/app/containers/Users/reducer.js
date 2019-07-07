/*
 *
 * Users reducer
 *
 */

import { FETCH_USERS } from './constants';

const initialState = {
  users: [],
  columns: [
    {
      hidden: true,
      dataField: '_id',
      text: ''
    },
    {
      dataField: 'email',
      text: 'User Email',
      classes: 'email-column'
    },
    {
      dataField: 'role',
      text: 'User Role'
    },
    {
      dataField: 'profile.firstName',
      text: 'First Name'
    },
    {
      dataField: 'profile.lastName',
      text: 'Last Name'
    }
  ]
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        users: action.payload
      };
    default:
      return state;
  }
};

export default usersReducer;
