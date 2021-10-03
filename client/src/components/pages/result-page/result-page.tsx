import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { GameResultsSave } from './game-results-save/game-results-save';
import { GameResults } from './game-results/game-results';
import '@styles/page.sass';
import '../game-page/game-top-section/game-top-section.sass';

const ResultPage = () => {
  const gameTitle: string =
    useSelector((state: RootState) => state.game.title) || 'Test Game title';
  return (
    <main className="main">
      <div className="container content-wrapper">
        <div className="game-top-section-title">{gameTitle}</div>
        <GameResultsSave />
        <GameResults />
      </div>
    </main>
  );
};

export default ResultPage;
