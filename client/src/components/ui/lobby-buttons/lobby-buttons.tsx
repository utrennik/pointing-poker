import { Button } from '@material-ui/core';
import { ILobbyButtons } from '@models/types';
import './lobby-buttons.sass';

export const LobbylButtons = ({
  startBtnText = 'Start Game',
  cancelBtnText = 'Cancel Game',
  onStart,
  onCancel,
  disableStartGame,
}: ILobbyButtons) => (
  <div className="lobby-buttons">
    <Button variant="contained" size="medium" onClick={onCancel}>
      {cancelBtnText}
    </Button>
    <Button
      variant="contained"
      size="medium"
      color="primary"
      onClick={onStart}
      disabled={disableStartGame}
    >
      {startBtnText}
    </Button>
  </div>
);
