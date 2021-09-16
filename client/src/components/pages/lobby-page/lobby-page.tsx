import GameSettingsSection from '@components/pages/lobby-page/game-settings-section/game-settings-section';
import MembersSection from '@components/pages/lobby-page/members-section/members-section';
import './lobby-page.sass';

const LobbyPage = () => (
  <div className="container">
    <div className="lobby-page">
      <div className="lobby-content">
        <MembersSection />
        <GameSettingsSection />
      </div>
    </div>
  </div>
);

export default LobbyPage;
