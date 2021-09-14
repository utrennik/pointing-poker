import WelcomePage from '@components/pages/welcome-page/welcome-page';
import LobbyPage from '@components/pages/lobby-page/lobby-page';
import GamePage from '@components/pages/game-page/game-page';
import ResultPage from '@components/pages/result-page/result-page';
import TestPage from '@components/pages/test-page/test-page';

export default [
  {
    path: '/',
    component: WelcomePage,
  },
  {
    path: '/lobby',
    component: LobbyPage,
  },
  {
    path: '/game',
    component: GamePage,
  },
  {
    path: '/result',
    component: ResultPage,
  },
  {
    path: '/test',
    component: TestPage,
  },
];
