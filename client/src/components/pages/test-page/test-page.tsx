import '@styles/page.sass';
import { GameVotingSection } from '@components/pages/game-page/game-voting-section/game-voting-section';
import './game-page.sass';

const TestPage = () => (
  <main className="main">
    <div className="container content-wrapper game-page">
      <div>Game Top Section</div>
      <div className="game-round-issues-section">Game Round Issues Section</div>
      <GameVotingSection />
    </div>
  </main>
);

export default TestPage;
