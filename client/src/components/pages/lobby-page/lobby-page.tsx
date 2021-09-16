import GameSettingsSection from '@components/game-settings-section/game-settings-section';
import './lobby-page.sass';

const LobbyPage = () => (
  <div className="container">
    <div className="lobby-page">
      <div className="lobby-content">
        <section className="lobby-content-game-settings">
          <GameSettingsSection />
        </section>
      </div>
    </div>
  </div>
);

export default LobbyPage;
