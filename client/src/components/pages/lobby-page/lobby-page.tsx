import MasterSection from '@components/pages/lobby-page/master-section/master-section';
import IssuesSection from '@components/pages/lobby-page/issues-section/issues-section';
import MembersSection from '@components/pages/lobby-page/members-section/members-section';
import GameSettingsSection from '@components/pages/lobby-page/game-settings-section/game-settings-section';
import GameCardsSection from '@components/pages/lobby-page/game-cards-section/game-cards-section';
import './lobby-page.sass';

const LobbyPage = () => (
  <div className="container">
    <div className="lobby-page">
      <div className="lobby-content">
        <MasterSection />
        <MembersSection />
        <IssuesSection />
        <GameSettingsSection />
        <GameCardsSection />
      </div>
    </div>
  </div>
);

export default LobbyPage;
