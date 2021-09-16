import { Route, Switch } from 'react-router-dom';
import { Header } from '@components/header/header';
import { Footer } from '@components/footer/footer';
import WelcomePage from '@components/pages/welcome-page/welcome-page';
import LobbyPage from '@components/pages/lobby-page/lobby-page';
import '@styles/main.sass';

const App = () => (
  <div className="app-container">
    <Header />

    <Switch>
      <Route exact path="/" component={WelcomePage} />
      <Route exact path="/lobby" component={LobbyPage} />
    </Switch>

    <Footer />
  </div>
);

export default App;
