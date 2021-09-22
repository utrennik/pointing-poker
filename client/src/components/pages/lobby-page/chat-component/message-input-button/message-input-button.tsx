import { ChangeEvent, useState } from 'react';
import { Box, IconButton, TextField } from '@material-ui/core';
import './message-input-button.sass';

const MessageInputButton = () => {
  const inputInitialValue = '';
  const [inputValue, setInputValue] = useState(inputInitialValue);

  const inputHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value && e.target.value !== 'Enter') {
      setInputValue(e.target.value);
      console.log('set value', e.target.value);
    }
  };

  const onKeyEnterHandler = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputValue !== inputInitialValue) {
        setInputValue(inputInitialValue);
        console.log('enter event', e.key);
      }
    }
  };

  const sendMessageHandler = (e: any): void => {
    if (inputValue !== inputInitialValue) {
      e.preventDefault();
      setInputValue(inputInitialValue);
      console.log('click event', e);
    }
  };

  return (
    <form className="message-input-button-form">
      <div className="message-input-button-input">
        <Box
          sx={{
            width: 300,
            maxWidth: '100%',
            marginRight: '10px',
          }}
        >
          {' '}
          <TextField
            variant="outlined"
            value={inputValue}
            onChange={inputHandler}
            onKeyDown={onKeyEnterHandler}
            fullWidth
          />
        </Box>
      </div>
      <div className="message-input-button-button">
        <IconButton className="send-btn" component="span" onClick={sendMessageHandler} />
      </div>
    </form>
  );
};

export default MessageInputButton;
