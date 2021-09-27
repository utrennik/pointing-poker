import { ChangeEvent, useState, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/redux/store';
import { WebSocketContext } from '@models/web-socket';
import { changeTitle } from '@src/redux/actions';
import './title-planning.sass';
import { IconButton, withStyles } from '@material-ui/core';

export const DarkerDisabledTextField = withStyles({
  root: {
    marginRight: 8,
    '& .MuiInputBase-root.Mui-disabled': {
      color: 'black',
    },
    '& .MuiInputBase-input': {
      fontSize: '1.5em',
      textAlign: 'center',
    },
  },
})(TextField);

const TitlePlaning = () => {
  const isDealerLobby = useSelector((state: RootState) => state.client.isDealerLobby);
  const gameTitle = useSelector((state: RootState) => state.game.title);
  const ws = useContext(WebSocketContext);
  const [isEditable, setIsEditable] = useState(false);
  const dispatch = useDispatch();

  const handleEdit = () => {
    setIsEditable(!isEditable);
  };

  const handleOnChange = (event: ChangeEvent<any>) => {
    dispatch(changeTitle(event.target.value));
  };

  const handleOnBlur = () => {
    setIsEditable(false);
    ws.requestTitleChange(gameTitle);
  };

  return (
    <div className="title-planning">
      <DarkerDisabledTextField
        id="title-planning"
        label={
          (gameTitle && 'Planning title') ||
          (isDealerLobby && 'Please add planning title:') ||
          'Planning title will appear here'
        }
        disabled={!isEditable}
        fullWidth={true}
        size="small"
        value={gameTitle || ''}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
      />
      {isDealerLobby && <IconButton className="title-planning-edit-btn" onClick={handleEdit} />}
    </div>
  );
};

export default TitlePlaning;
