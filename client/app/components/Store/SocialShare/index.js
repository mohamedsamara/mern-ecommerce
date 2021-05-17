/**
 *
 * SocialShare
 *
 */

import React from 'react';

import {
  EmailShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookShareButton
} from 'react-share';

class SocialShare extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    const { product } = this.props;

    const shareMsg = `I ♥ ${
      product.name
    } product on Mern Mart!  Here's the link, ${
      window.location.protocol !== 'https' ? 'http' : 'https'
    }://${window.location.host}/product/${
      product.slug
    } #buyonMernMart via @MernMart `;
    return (
      <div className='px-3'>
        <div className='share-header share-wrapper share-cirle'>
          <ul className='menu topLeft myShareCountWrapper'>
            <li
              className={`share ${
                this.state.width < 367 || this.state.height < 220
                  ? 'bottom'
                  : 'right'
              }`}
            >
              <i className='fa fa-share-alt'></i>
              <ul className='submenu'>
                <li>
                  <FacebookShareButton
                    url={`${shareMsg}`}
                    className='al facebook'
                  >
                    <i className='fa fa-facebook'></i>
                  </FacebookShareButton>
                </li>
                <li>
                  <TwitterShareButton
                    url={`${shareMsg}`}
                    className='al twitter'
                  >
                    <i className='fa fa-twitter'></i>
                  </TwitterShareButton>
                </li>
                <li>
                  <EmailShareButton url={`${shareMsg}`} className='al envelope'>
                    <i className='fa fa-envelope-o'></i>
                  </EmailShareButton>
                </li>
                <li>
                  <WhatsappShareButton
                    url={`${shareMsg}`}
                    className='al whatsapp'
                  >
                    <i className='fa fa-whatsapp'></i>
                  </WhatsappShareButton>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default SocialShare;
