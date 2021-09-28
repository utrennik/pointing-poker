import { ChangeEvent, useContext, useState } from 'react';
import { Box, IconButton, TextField } from '@material-ui/core';
import './message-input-button.sass';
import { IMessage, IUser } from '@models/types';
import { useSelector } from 'react-redux';
import { WebSocketContext } from '@models/web-socket';
import { RootState } from 'src/redux/store';
import { id } from '@utils/utils';

const MessageInputButton = () => {
  const messageInitialValue = '';
  const [messageText, setMessageText] = useState(messageInitialValue);

  const roomID: string = useSelector((state: RootState) => state.game.room);
  const clientUser: IUser = useSelector((state: RootState) => state.client.clientUser);
  const ws = useContext(WebSocketContext);

  const onChangeMessageHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value !== 'Enter') {
      setMessageText(e.target.value);
      console.log('set value', e.target.value);
    }
  };

  const sendMessage = () => {
    const messageID = id();
    const newMessage: IMessage = {
      messageID,
      room: roomID,
      userID: clientUser.id,
      message: messageText,
    };

    ws.requestAddMessage(newMessage);
    setMessageText(messageInitialValue);
  };

  const onKeyEnterHandler = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (messageText !== messageInitialValue) {
        console.log('enter event', e.key);
        sendMessage();
      }
    }
  };

  const onClickHandler = (e: any): void => {
    if (messageText !== messageInitialValue) {
      e.preventDefault();
      console.log('click event', e);
      sendMessage();
    }
  };

  return (
    <form className="message-input-button-form">
      <div className="message-input-button-input">
        <Box
          sx={{
            width: 240,
            maxWidth: '100%',
            marginRight: '10px',
          }}
        >
          {' '}
          <TextField
            variant="outlined"
            value={messageText}
            onChange={onChangeMessageHandler}
            onKeyDown={onKeyEnterHandler}
            fullWidth
          />
        </Box>
      </div>
      <div className="message-input-button-button">
        <IconButton className="send-btn" component="span" onClick={onClickHandler} />
      </div>
    </form>
  );
};

export default MessageInputButton;
