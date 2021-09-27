import MasterSection from '@components/pages/lobby-page/master-section/master-section';
import IssuesSection from '@components/pages/lobby-page/issues-section/issues-section';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { IUser } from '@models/types';
import MembersSection from '@components/pages/lobby-page/members-section/members-section';
import GameSettingsSection from '@components/pages/lobby-page/game-settings-section/game-settings-section';
import './lobby-page.sass';

const LobbyPage = () => {
  const isDealerLobby = useSelector((state: RootState) => state.client.isDealerLobby);
  const members: IUser[] = useSelector((state: RootState) => state.game.users as IUser[]);
  return (
    <div className="container">
      <div className="lobby-page">
        <div className="lobby-content">
          <MasterSection isDealerLobby={isDealerLobby} />
          {!!members.length && <MembersSection isDealerLobby={isDealerLobby} members={members} />}
          {isDealerLobby && (
            <>
              {<IssuesSection />}
              <GameSettingsSection />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LobbyPage;
