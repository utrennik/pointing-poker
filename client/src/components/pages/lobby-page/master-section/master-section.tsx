import { ScramMasterCard } from '@components/ui/scram-master-card/scram-master-card';
import InputButton from '@components/ui/input-button/input-button';

import './master-section.sass';
import { LobbylButtons } from '@components/ui/lobby-buttons/lobby-buttons';

export const scramMaster = {
  firstName: 'David',
  lastName: 'Blane',
  role: 'Senior Software Engineer',
  avatarImage: '',
};

const MasterSection = (/* isScramMasterLobby: boolean */) => {
  const { firstName, lastName, role, avatarImage } = scramMaster;
  const linkButtonText = 'Copy';
  const startBtnText = 'Start Game';
  const cancelBtnText = 'Cancel Game';

  const copyLinkHandler = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  const handleStartGame = () => {
    console.log('Start game!');
  };

  const handleCancelGame = () => {
    console.log('Cancel game!');
  };

  return (
    <section className="lobby-content-master">
      <h3 className="section-header">Spring 23 planning (issues 13, 533, 5623, 3252, 6623, ...)</h3>
      <h5 className="section-subheader">Scram master:</h5>
      <div className="master-lobby">
        <ScramMasterCard
          firstName={firstName}
          lastName={lastName}
          role={role}
          avatarImage={avatarImage}
          // isScramMasterLobby={isScramMasterLobby}
        />
      </div>
      <h4 className="section-subheader">Link to lobby:</h4>
      <InputButton buttonText={linkButtonText} valueHandler={copyLinkHandler} />
      <LobbylButtons
        startBtnText={startBtnText}
        cancelBtnText={cancelBtnText}
        onStart={handleStartGame}
        onCancel={handleCancelGame}
        disableStartGame={false}
      />
    </section>
  );
};

export default MasterSection;
