import React from 'react';
import '@styles/main.sass';
import { Header } from '@components/header/header';
import { Footer } from '@components/footer/footer';
import { Route, Switch } from 'react-router-dom';
import { Main } from './pages/main/main.tsx';

const App: React.FC = () => (
  <div className="app-container">
    <Header />
    <Switch>
      <Route exact path="/" component={Main} />
    </Switch>
    <Footer />
  </div>
);

export default App;
