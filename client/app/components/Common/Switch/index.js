/**
 *
 * Switch
 *
 */

import React from 'react';

class Switch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: this.props.checked
    };
  }

  _onChange(e) {
    const value = e.target.checked;

    this.setState({
      checked: value
    });

    if (this.props.toggleCheckboxChange) {
      this.props.toggleCheckboxChange(value);
    }
  }

  render() {
    const { id, toggleCheckboxChange } = this.props;
    const { checked } = this.state;

    return (
      <div className='switch-checkbox'>
        <input
          id={id}
          type={'checkbox'}
          className='switch-checkbox-input'
          // value={label}
          checked={checked}
          onChange={e => this._onChange(e)}
        />
        <label htmlFor={id} className='switch-label' />
      </div>
    );
  }
}

export default Switch;
