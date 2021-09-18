import { ScramMasterCard } from '@components/ui/scram-master-card/scram-master-card';
import InputButton from '@components/ui/input-button/input-button';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { IUser } from '@models/types';
import { LobbylButtons } from '@components/ui/lobby-buttons/lobby-buttons';
import TitlePlaning from '@components/ui/title-planning/title-planning';
import './master-section.sass';

const MasterSection = () => {
  const { firstName, lastName, jobPosition, avatar } = useSelector(
    (state: RootState) => state.client.clientUser as IUser
  );
  const isDealerLobby = useSelector((state: RootState) => state.client.isDealerLobby);
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
      <TitlePlaning />
      <h5 className="section-subheader">Scram master:</h5>
      <div className="master-lobby">
        <ScramMasterCard
          firstName={firstName}
          lastName={lastName}
          role={jobPosition || ''}
          avatarImage={avatar}
          isScramMasterLobby={isDealerLobby}
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
