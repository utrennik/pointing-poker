import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { WebSocketContext } from '@models/web-socket';
import { Button } from '@material-ui/core';
import InputButton from '@components/ui/input-button/input-button';
import ConnectModal from '@components/modals/connect-modal/connect-modal';
import StartModal from '@components/modals/start-modal/start-modal';
import { filterIDfromURL } from '@utils/stringUtils';
import pokerLogo from '@assets/images/poker.svg';
import config from '@src/config.json';
import '@styles/page.sass';
import './welcome-page.sass';

const WelcomePage = () => {
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const [startModalOpen, setStartModalOpen] = useState(false);
  const [noRoomError, setNoRoomError] = useState(false);
  const [enteredRoomID, setEnteredRoomID] = useState('');

  const ws = useContext(WebSocketContext);
  const { id } = useParams<{ id: string }>();
  const isConnectionError = useSelector((state: RootState) => state.socket.socketError);

  const handleConnectModalOpen = (val: string) => {
    setEnteredRoomID(val);
    ws.checkIsRoomExists(filterIDfromURL(val), setConnectModalOpen, setNoRoomError);
  };

  const handleConnectModalClose = () => {
    setConnectModalOpen(false);
  };
  const handleStartModalOpen = () => {
    setStartModalOpen(true);
  };

  const handleStartModalClose = () => {
    setStartModalOpen(false);
  };

  return (
    <>
      <div className="welcome-page">
        <div className="welcome-logo-container">
          <div className="welcome-logo">
            <img src={pokerLogo} alt="" />
          </div>
          <div className="welcome-title">Planning poker</div>
        </div>

        <div className="welcome-content">
          <h2 className="welcome-header">Start your planning:</h2>

          <div className="start-game-container error-down">
            <div className="action-title">Create session:</div>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              onClick={handleStartModalOpen}
            >
              Start new game
            </Button>
            <div className="error-container">
              {isConnectionError ? config.CONNECT_ERROR_MESSAGE : ''}
            </div>
          </div>

          <h2 className="welcome-header">OR</h2>

          <div className="connect-container error-down">
            <div className="action-title">
              Connect to lobby by <span>ID or URL</span>:
            </div>
            <InputButton
              buttonText="Connect"
              initialValue={id}
              inputLabel="ID or URL"
              valueHandler={(val) => {
                handleConnectModalOpen(val);
              }}
            />
            <div className="error-container">
              {isConnectionError && !noRoomError && config.CONNECT_ERROR_MESSAGE}
              {noRoomError && config.NO_ROOM_ERROR_MESSAGE}
            </div>
          </div>
        </div>
      </div>

      <ConnectModal
        isOpen={connectModalOpen}
        onClose={handleConnectModalClose}
        roomID={enteredRoomID}
      />
      <StartModal isOpen={startModalOpen} onClose={handleStartModalClose} />
    </>
  );
};

export default WelcomePage;
