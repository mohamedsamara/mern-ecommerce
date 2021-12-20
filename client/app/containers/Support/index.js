/*
 *
 * Helpcenter
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';

import Support from '../../components/Manager/Support';
import SubPage from '../../components/Manager/SubPage';

class Helpcenter extends React.PureComponent {
  componentDidMount() {
    // this.props.fetchProfile();
  }

  render() {
    const { user } = this.props;

    return (
      <div className='support-dashboard'>
        <SubPage
          title={user.role == 'ROLE_ADMIN' ? 'Admin Support' : 'Support'}
          isMenuOpen={null}
        >
          <Support user={user} />
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
