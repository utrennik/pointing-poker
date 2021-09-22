import MasterSection from '@components/pages/lobby-page/master-section/master-section';
import IssuesSection from '@components/pages/lobby-page/issues-section/issues-section';
import MembersSection from '@components/pages/lobby-page/members-section/members-section';
import GameSettingsSection from '@components/pages/lobby-page/game-settings-section/game-settings-section';
import Chat from '@components/pages/lobby-page/chat-component/chat-component';
import './lobby-page.sass';

const LobbyPage = () => (
  <div className="lobby-container">
    <div className="container">
      <div className="lobby-page">
        <div className="lobby-content">
          <MasterSection />
          <MembersSection />
          <IssuesSection />
          <GameSettingsSection />
        </div>
      </div>
    </div>
    <Chat />
  </div>
);

export default LobbyPage;
