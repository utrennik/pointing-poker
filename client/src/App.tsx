import { Route, Switch, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Header from '@components/header/header';
import Footer from '@components/footer/footer';
import routes from '@components/router/routes';
import { DeleteVotingModal } from '@components/modals/delete-voting-modal/delete-voting-modal';
import { NotificationModal } from '@components/modals/notification-modal/notification-modal';

import config from './config.json';

import '@styles/main.sass';

const App = () => {
  const location = useLocation();

  const routeComponents = routes.map(({ path, component, key }) => (
    <Route exact path={path} component={component} key={key} />
  ));

  return (
    <div className="app-container">
      <Header />
      <TransitionGroup exit={false}>
        <CSSTransition
          timeout={config.transition.timeout}
          classNames="transition"
          key={location.key}
        >
          <Switch location={location}>{routeComponents}</Switch>
        </CSSTransition>
      </TransitionGroup>
      <Footer />
      <DeleteVotingModal />
      <NotificationModal />
    </div>
  );
};

export default App;
