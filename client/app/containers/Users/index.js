/*
 *
 * Users
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';

import Table from '../../components/Table';

class Users extends React.PureComponent {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    const { users, columns } = this.props;

    return (
      <div className='users'>
        <Table
          data={users}
          columns={columns}
          striped={true}
          hover={true}
          condensed={true}
          csv={true}
          search={true}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users.users,
    columns: state.users.columns
  };
};

export default connect(
  mapStateToProps,
  actions
)(Users);
