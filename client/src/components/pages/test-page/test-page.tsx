import { GameVotingSection } from '@components/pages/game-page/game-voting-section/game-voting-section';
import '@styles/page.sass';
import '../game-page/game-page.sass';

const TestPage = () => (
  <main className="main">
    <div className="container content-wrapper game-page">
      <div className="game-top-section">Game Top Section</div>
      <div className="game-round-issues-section">Game Round Issues Section</div>
      <GameVotingSection />
    </div>
  </main>
);

export default TestPage;
