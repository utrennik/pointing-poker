import '@styles/page.sass';
import { GameResultsSave } from './game-results-save/game-results-save';

const ResultPage = () => (
  <main className="main">
    <div className="container content-wrapper">
      <h1>Result page</h1>
      <GameResultsSave />
    </div>
  </main>
);

export default ResultPage;
