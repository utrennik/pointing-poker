import { Route, Switch } from 'react-router-dom';

import { Header } from '@components/header/header';
import { Footer } from '@components/footer/footer';

import { Main } from './pages/main/main.tsx';

import '@styles/main.sass';

const App = () => (
  <div className="app-container">
    <Header />
    <Switch>
      <Route exact path="/" component={Main} />
    </Switch>
    <Footer />
  </div>
);

export default App;
