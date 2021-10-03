/*
 *
 * Helpcenter
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';

import SupportScreen from '../../components/Manager/SupportScreen';
import ChatBox from '../../components/Manager/SupportScreen/ChatBox';
import SubPage from '../../components/Manager/SubPage';

class Helpcenter extends React.PureComponent {
  componentDidMount() {
    // this.props.fetchProfile();
  }

  render() {
    const { user, accountChange, updateProfile } = this.props;

    return (
      <div className='account'>
        <SubPage title={user.role == 'ROLE_ADMIN'?'Admin Support':'Support'} isMenuOpen={null}>
          {user.role == 'ROLE_ADMIN'?
          (<SupportScreen
            user={user}
            accountChange={accountChange}
            updateProfile={updateProfile}
          />):(
            <ChatBox
              user={user}
              accountChange={accountChange}
              updateProfile={updateProfile}
            />
          )}
        </SubPage>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.account.user,
    resetFormData: state.resetPassword.resetFormData,
    formErrors: state.resetPassword.formErrors
  };
};

export default connect(mapStateToProps, actions)(Helpcenter);
