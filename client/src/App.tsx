import { Route, Switch, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Header from '@components/header/header';
import Footer from '@components/footer/footer';
import routes from '@components/router/routes';

import '@styles/main.sass';

const App = () => {
  const location = useLocation();

  const routeComponents = routes.map(({ path, component }, key) => (
    <Route exact path={path} component={component} key={key} />
  ));

  return (
    <div className="app-container">
      <Header />

      <TransitionGroup exit={false}>
        <CSSTransition timeout={300} classNames="transition" key={location.key}>
          <Switch location={location}>{routeComponents}</Switch>
        </CSSTransition>
      </TransitionGroup>

      <Footer />
    </div>
  );
};

export default App;
