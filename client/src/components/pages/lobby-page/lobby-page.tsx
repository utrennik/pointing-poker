import MasterSection from '@components/pages/lobby-page/master-section/master-section';
import IssuesSection from '@components/pages/lobby-page/issues-section/issues-section';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { IUser } from '@models/types';
import MembersSection from '@components/pages/lobby-page/members-section/members-section';
import GameSettingsSection from '@components/pages/lobby-page/game-settings-section/game-settings-section';
import './lobby-page.sass';
import { useEffect, useState } from 'react';
import { ILobbySettings } from '@models/types';

const LobbyPage = () => {
  const isDealerLobby = useSelector((state: RootState) => state.client.isDealerLobby);
  const members: IUser[] = useSelector((state: RootState) => state.game.users as IUser[]);
  const [lobbyGameSettings, setLobbyGameSettings] = useState<ILobbySettings | null>();

  const changePokerGameSettings = (value: any) => {
    setLobbyGameSettings(value);
  };
  return (
    <div className="container">
      <div className="lobby-page">
        <div className="lobby-content">
          <MasterSection isDealerLobby={isDealerLobby} lobbyGameSettings={lobbyGameSettings!}/>
          {!!members.length && <MembersSection isDealerLobby={isDealerLobby} members={members} />}
          {isDealerLobby && (
            <>
              {<IssuesSection sectionTitle="Issues:" />}
              <GameSettingsSection changePokerGameSettings={changePokerGameSettings}/>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LobbyPage;
