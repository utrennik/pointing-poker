import MasterSection from '@components/pages/lobby-page/master-section/master-section';
// import IssuesSection from '@components/pages/lobby-page/issues-section/issues-section';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import MembersSection from '@components/pages/lobby-page/members-section/members-section';
import GameSettingsSection from '@components/pages/lobby-page/game-settings-section/game-settings-section';
import Chat from '@components/pages/lobby-page/chat-component/chat-component';
import './lobby-page.sass';

const LobbyPage = () => {
  const isDealerLobby = useSelector((state: RootState) => state.client.isDealerLobby);

  return (
    <div className="lobby-container">
      <div className="container">
        <div className="lobby-page">
          <div className="lobby-content">
            <MasterSection isDealerLobby={isDealerLobby} />
            <MembersSection isDealerLobby={isDealerLobby} />
            {isDealerLobby && (
              <>
                {/* <IssuesSection /> */}
                <GameSettingsSection />
              </>
            )}
          </div>
        </div>
      </div>
      <Chat />
    </div>
  );
};

export default LobbyPage;
