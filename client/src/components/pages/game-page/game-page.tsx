import '@styles/page.sass';
import { PlayersSection } from '@components/pages/game-page/players-section/players-section';

const GamePage = () => (
  <main className="main">
    <div className="container content-wrapper">
      <PlayersSection />
    </div>
  </main>
);

export default GamePage;
