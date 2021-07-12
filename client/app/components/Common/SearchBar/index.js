import React from 'react';

import Button from '../Button';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      typing: false,
      typingTimeout: 0
    };
  }

  _onChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }

    this.setState({
      value,
      typing: false,
      typingTimeout: setTimeout(() => {
        if (this.props.onSearch) {
          this.props.onSearch({ name, value });
        }
      }, 1000)
    });
  }

  _handleSubmit(e) {
    e.preventDefault();

    const name = this.props.name;
    const value = this.state.value;

    if (this.props.onSearchSubmit) {
      this.props.onSearchSubmit({ name, value });
    }
  }

  _onBlur(e) {
    const name = e.target.name;
    const value = e.target.value;

    if (this.props.onBlur) {
      this.props.onBlur({ name, value });
    }
  }

  render() {
    const {
      id,
      name,
      placeholder,
      className,
      inlineBtn,
      btnText,
      autoComplete
    } = this.props;
    const { value } = this.state;

    const styles = `search-box${inlineBtn ? ` inline-btn-box` : ''}`;
    const classNames = `input-text search-box${`${
      className && ` ${className}`
    }`}`;

    return (
      <form onSubmit={e => this._handleSubmit(e)} noValidate>
        <div className={styles}>
          <div className='input-text-block'>
            <input
              autoComplete={autoComplete}
              type='text'
              id={id}
              name={name}
              className={classNames}
              placeholder={placeholder}
              value={value}
              onChange={e => {
                this._onChange(e);
              }}
              onBlur={e => this._onBlur(e)}
              onKeyPress={this.props.onKeyPress || null}
            />
            <Button type='submit' variant='primary' text={btnText} />
          </div>
        </div>
      </form>
    );
  }
}

SearchBar.defaultProps = {
  className: '',
  id: 'search',
  name: 'search',
  placeholder: 'Search',
  inlineBtn: true,
  btnText: 'Search',
  autoComplete: 'off'
};

export default SearchBar;
