/**
 *
 * Notification
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Notifications from 'react-notification-system-redux';

import actions from '../../actions';

export class Notification extends React.PureComponent {
  componentDidMount() {}

  render() {
    const { notifications } = this.props;

    const style = {
      NotificationItem: {
        DefaultStyle: {
          margin: '10px 5px 2px 1px'
        },

        success: {
          color: 'red'
        }
      }
    };
    return <Notifications notifications={notifications} style={style} />;
  }
}

const mapStateToProps = state => {
  return {
    notifications: state.notifications
  };
};

export default connect(
  mapStateToProps,
  actions
)(Notification);
