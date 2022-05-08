/*
 *
 * Support
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';

import { default as SupportManager } from '../../components/Manager/Support';

class Support extends React.PureComponent {
  render() {
    const { user } = this.props;

    return (
      <div className='support'>
        <h2>Support Information</h2>
        <hr />
        <div className='mt-5'>
          <SupportManager user={user} />
        </div>
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

export default connect(mapStateToProps, actions)(Support);
