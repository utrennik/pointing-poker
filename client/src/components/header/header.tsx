import { NavLink } from 'react-router-dom';

import routes from '@components/router/routes';

import '@styles/header.sass';

const Header = () => (
  <header className="header">
    <div className="header-up">
      <div className="container header-up-wrapper">
        <ul className="nav-wrapper">
          {routes.map(({ title, path }) => (
            <li key={title}>
              <NavLink exact activeClassName="active" className="nav-link" to={path}>
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="chat-wrapper">
          <div className="chat-icon"></div>
        </div>
      </div>
    </div>
    <div className="header-down">
      <div className="container logo-wrapper">
        <NavLink exact className="logo" to="/"></NavLink>
      </div>
    </div>
  </header>
);

export default Header;
