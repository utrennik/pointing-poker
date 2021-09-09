import { useState } from 'react';
import { Button } from '@material-ui/core';
import InputButton from '@components/ui/input-button/input-button';
import ConnectModal from '@components/modals/connect-modal/connect-modal';
import pokerLogo from '@assets/images/poker.svg';
import '@styles/page.sass';
import './welcome-page.sass';

const WelcomePage = () => {
  const [connectModalOpen, setConnectModalOpen] = useState(false);

  const handleOpen = () => {
    setConnectModalOpen(true);
  };

  const handleClose = () => {
    setConnectModalOpen(false);
  };

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
            <Button variant="contained" size="medium" color="primary">
              Start new game
            </Button>
            <div className="error-container">Error! The session cannot be created!</div>
          </div>

          <h2 className="welcome-header">OR</h2>

          <div className="connect-container error-down">
            <div className="action-title">
              Connect to lobby by <span>URL</span>:
            </div>
            <InputButton
              buttonText="Connect"
              valueHandler={(value: string) => {
                handleOpen();
                console.log(value);
              }}
            />
            <div className="error-container">Error! Connection failure!</div>
          </div>
        </div>
      </div>

      <ConnectModal isOpen={connectModalOpen} onClose={handleClose} />
    </div>
  );
};

export default WelcomePage;
