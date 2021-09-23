import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { IMasterSection, IUser } from '@models/types';
import InputButton from '@components/ui/input-button/input-button';
import { Button } from '@material-ui/core';
import { ScramMasterCard } from '@components/ui/scram-master-card/scram-master-card';
import { WebSocketContext } from '@models/web-socket';
import { LobbylButtons } from '@components/ui/lobby-buttons/lobby-buttons';
import TitlePlaning from '@components/ui/title-planning/title-planning';

import './master-section.sass';
import { useHistory } from 'react-router-dom';

const MasterSection = ({ isDealerLobby, lobbyGameSettings }: IMasterSection) => {
  const { firstName, lastName, jobPosition, avatar } = useSelector(
    (state: RootState) => state.game.dealer as IUser
  );
  const ws = useContext(WebSocketContext);
  const roomID = useSelector((state: RootState) => state.game.room);
  const linkButtonText = 'Copy';
  const startBtnText = 'Start Game';
  const cancelBtnText = 'Cancel Game';
  const history = useHistory();

  const copyLinkHandler = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  const handleStartGame = () => {
    console.log('Start game!');
    ws.requestPokerGameStart(lobbyGameSettings);
    history.push('/game');
  };

  const handleCancelGame = () => {
    console.log('Cancel game!');
    ws.requestCancelGame();
  };

  const getGameLink = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.protocol}//${window.location.host}/link/${roomID}`;
    }
    return roomID;
  };

  const onClienExit = () => {
    ws.clientExit();
  };

  return (
    <section className="lobby-content-master">
      <TitlePlaning />
      <h5 className="section-subheader">Scrum master:</h5>
      <div className="master-lobby">
        <ScramMasterCard
          firstName={firstName}
          lastName={lastName}
          role={jobPosition || ''}
          avatarImage={avatar}
          isScramMasterLobby={isDealerLobby}
        />
      </div>
      {isDealerLobby && (
        <>
          <h4 className="section-subheader">Link to lobby:</h4>
          <InputButton
            buttonText={linkButtonText}
            valueHandler={copyLinkHandler}
            initialValue={getGameLink()}
          />
          <LobbylButtons
            startBtnText={startBtnText}
            cancelBtnText={cancelBtnText}
            onStart={handleStartGame}
            onCancel={handleCancelGame}
            disableStartGame={false}
          />
        </>
      )}
      {!isDealerLobby && (
        <div className="lobby-buttons-client">
          <Button variant="contained" size="medium" onClick={onClienExit}>
            Exit
          </Button>
        </div>
      )}
    </section>
  );
};

export default MasterSection;
