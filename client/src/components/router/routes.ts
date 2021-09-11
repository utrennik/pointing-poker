import WelcomePage from '@components/pages/welcome-page';
import LobbyPage from '@components/pages/lobby-page';
import GamePage from '@components/pages/game-page';
import ResultPage from '@components/pages/result-page';
import TestPage from '@components/pages/test-page';

export default [
  {
    path: '/',
    component: WelcomePage,
    title: 'WelcomePage',
  },
  {
    path: '/lobby',
    component: LobbyPage,
    title: 'LobbyPage',
  },
  {
    path: '/game',
    component: GamePage,
    title: 'GamePage',
  },
  {
    path: '/result',
    component: ResultPage,
    title: 'ResultPage',
  },
  {
    path: '/test',
    component: TestPage,
    title: 'TestPage',
  },
];
