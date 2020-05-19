/**
 *
 * Footer
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';

import Newsletter from '../../containers/Newsletter';
import actions from '../../actions';

class Footer extends React.PureComponent {
  render() {
    const { authenticated } = this.props;

    const infoLinks = [
      { id: 0, name: 'Contact Us', to: '/contact' },
      { id: 1, name: 'Sell With Us', to: '/sell' },
      { id: 2, name: 'Shipping', to: '/shipping' }
    ];

    const footerBusinessLinks = (
      <ul className='support-links'>
        <li className='footer-link'>
          <Link to='/dashboard'>Account Details</Link>
        </li>
        <li className='footer-link'>
          <Link to='/dashboard/orders'>Orders</Link>
        </li>
      </ul>
    );

    const footerLinks = infoLinks.map(item => (
      <li key={item.id} className='footer-link'>
        <Link key={item.id} to={item.to}>
          {item.name}
        </Link>
      </li>
    ));

    return (
      <footer className='footer'>
        <Container>
          <div className='footer-content'>
            <div className='footer-block'>
              <div className='block-title'>
                <h2>Customer Service</h2>
              </div>
              <div className='block-content'>
                <ul>{footerLinks}</ul>
              </div>
            </div>
            <div className='footer-block'>
              <div className='block-title'>
                <h2>Links</h2>
              </div>
              <div className='block-content'>
                <ul>{footerLinks}</ul>
              </div>
            </div>

            {authenticated ? (
              <div className='footer-block'>
                <div className='block-title'>
                  <h2>Account</h2>
                </div>
                <div className='block-content'>
                  <ul>{footerBusinessLinks}</ul>
                </div>
              </div>
            ) : (
              <div className='footer-block'>
                <div className='block-title'>
                  <h2>Newsletter</h2>
                  <Newsletter />
                </div>
              </div>
            )}
          </div>
          <div className='footer-copyright'>
            <span>© {new Date().getFullYear()} MERN Store</span>
          </div>
          <ul className='footer-social-item'>
            <li>
              <a href='/#facebook' rel='noreferrer noopener' target='_blank'>
                <span className='facebook-icon' />
              </a>
            </li>
            <li>
              <a href='/#instagram' rel='noreferrer noopener' target='_blank'>
                <span className='instagram-icon' />
              </a>
            </li>
            <li>
              <a href='/#pinterest' rel='noreferrer noopener' target='_blank'>
                <span className='pinterest-icon' />
              </a>
            </li>
            <li>
              <a href='/#twitter' rel='noreferrer noopener' target='_blank'>
                <span className='twitter-icon' />
              </a>
            </li>
          </ul>
        </Container>
      </footer>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.authentication.authenticated
  };
};

export default connect(mapStateToProps, actions)(Footer);
