/*
 *
 * Users
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import UserList from '../../components/Manager/UserList';
import UserSearch from '../../components/Manager/UserSearch';
import SubPage from '../../components/Manager/SubPage';
import SearchResultMeta from '../../components/Manager/SearchResultMeta';
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import Pagination from '../../components/Common/Pagination';

class Users extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      search: ''
    };
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  handleUserSearch = e => {
    if (e.value.length >= 2) {
      this.props.searchUsers({ name: 'user', value: e.value });
      this.setState({
        search: e.value
      });
    } else {
      this.setState({
        search: ''
      });
    }
  };

  handleOnPagination = (n, v) => {
    this.props.fetchUsers(v);
  };

  render() {
    const { users, isLoading, searchedUsers, searchUsers, advancedFilters } =
      this.props;

    const { search } = this.state;
    const isSearch = search.length > 0;
    const filteredUsers = search ? searchedUsers : users;
    const displayPagination = advancedFilters.totalPages > 1;
    const displayUsers = filteredUsers && filteredUsers.length > 0;

    return (
      <div className='users-dashboard'>
        <SubPage title='Users' />
        <UserSearch
          onSearch={this.handleUserSearch}
          onSearchSubmit={searchUsers}
        />
        {isLoading && <LoadingIndicator />}
        {displayUsers && (
          <>
            {!isSearch && displayPagination && (
              <Pagination
                totalPages={advancedFilters.totalPages}
                onPagination={this.handleOnPagination}
              />
            )}
            <SearchResultMeta
              label='users'
              count={isSearch ? filteredUsers.length : advancedFilters.count}
            />
            <UserList users={filteredUsers} />
          </>
        )}
        {!isLoading && !displayUsers && <NotFound message='No users found.' />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users.users,
    searchedUsers: state.users.searchedUsers,
    advancedFilters: state.users.advancedFilters,
    isLoading: state.users.isLoading
  };
};

export default connect(mapStateToProps, actions)(Users);
