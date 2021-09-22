import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import InputButton from '@components/ui/input-button/input-button';
import ConnectModal from '@components/modals/connect-modal/connect-modal';
import StartModal from '@components/modals/start-modal/start-modal';
import pokerLogo from '@assets/images/poker.svg';
import '@styles/page.sass';
import './welcome-page.sass';

const WelcomePage = () => {
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const [startModalOpen, setStartModalOpen] = useState(false);

  const handleConnectModalOpen = () => {
    setConnectModalOpen(true);
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

  const { id } = useParams<{ id: string }>();

  return (
    <div className="container">
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
            <div className="error-container">Error! The session cannot be created!</div>
          </div>

          <h2 className="welcome-header">OR</h2>

          <div className="connect-container error-down">
            <div className="action-title">
              Connect to lobby by <span>ID</span>:
            </div>
            <InputButton
              buttonText="Connect"
              initialValue={id}
              inputLabel="ID"
              valueHandler={() => {
                handleConnectModalOpen();
              }}
            />
            <div className="error-container">Error! Connection failure!</div>
          </div>
        </div>
      </div>

      <ConnectModal isOpen={connectModalOpen} onClose={handleConnectModalClose} />
      <StartModal isOpen={startModalOpen} onClose={handleStartModalClose} />
    </div>
  );
};

export default WelcomePage;
