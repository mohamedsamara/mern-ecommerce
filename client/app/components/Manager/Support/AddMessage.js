import React, { useState } from 'react';

import Input from '../../Common/Input';
import Button from '../../Common/Button';

const AddMessage = props => {
  const { onSubmit } = props;
  const [message, setMessage] = useState('');

  const handleOnSubmit = e => {
    e.preventDefault();
    if (!message.trim()) {
      return alert('Please type message.');
    }
    onSubmit(message);
    setMessage('');
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <Input
        autoComplete='off'
        type={'text'}
        name={'message'}
        placeholder='type message'
        value={message}
        onInputChange={(_, value) => setMessage(value)}
        inlineElement={<SendButton disabled={!message} />}
      />
    </form>
  );
};

const SendButton = ({ disabled }) => (
  <Button type='submit' disabled={disabled} variant='primary' text='Send' />
);

export default AddMessage;
