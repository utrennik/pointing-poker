import WelcomePage from '@components/pages/welcome-page/welcome-page';
import LobbyPage from '@components/pages/lobby-page/lobby-page';
import GamePage from '@components/pages/game-page/game-page';
import ResultPage from '@components/pages/result-page/result-page';
import TestPage from '@components/pages/test-page/test-page';

export default [
  {
    path: '/',
    component: WelcomePage,
    key: '1',
  },
  {
    path: '/lobby',
    component: LobbyPage,
    key: '2',
  },
  {
    path: '/game',
    component: GamePage,
    key: '3',
  },
  {
    path: '/result',
    component: ResultPage,
    key: '4',
  },
  {
    path: '/test',
    component: TestPage,
    key: '5',
  },
  {
    path: '/link/:id',
    component: WelcomePage,
    key: '6',
  },
];
