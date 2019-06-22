/**
 *
 * Footer
 *
 */

import React from 'react';

import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';

const Footer = props => {
  const infoLinks = [
    { id: 0, name: 'Contact Us', to: 'contact' },
    { id: 1, name: 'Returns', to: 'return' },
    { id: 2, name: 'Shipping', to: 'shipping' }
  ];

  const footerBusinessLinks = (
    <ul className='support-links'>
      <li className='footer-link'>
        <Link to='/signup'>SignUp</Link>
      </li>
      <li className='footer-link'>
        <Link to='/login'>Login</Link>
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
          <div className='footer-block'>
            <div className='block-title'>
              <h2>Newsletter</h2>
            </div>
            <div className='block-content'>{footerBusinessLinks}</div>
          </div>
        </div>

        <div className='footer-copyright'>
          <span>© {new Date().getFullYear()} MERN TypeScript Boilerplate</span>
        </div>
        <ul className='footer-social-item'>
          <li>
            <span className='facebook-icon' />
            <a href='/facebook.com/' rel='noreferrer' target='_blank' />
          </li>
          <li>
            <span className='instagram-icon' />
            <a href='/instagram.com/' rel='noreferrer' target='_blank' />
          </li>
          <li>
            <span className='pinterest-icon' />
            <a href='/pinterest.com/' rel='noreferrer' target='_blank' />
          </li>
          <li>
            <span className='twitter-icon' />
            <a href='/twitter.com/' rel='noreferrer' target='_blank' />
          </li>
        </ul>
      </Container>
    </footer>
  );
};

export default Footer;
