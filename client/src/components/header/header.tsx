import React from 'react';
import { NavLink } from 'react-router-dom';
import '@styles/header.sass';

export const Header: React.FC = () => (
  <header className="header">
    <div className="header-up">
      <div className="container chat__wrapper">
        <div className="chat__icon"></div>
      </div>
    </div>
    <div className="header-down">
      <div className="container logo__wrapper">
        <NavLink exact className="logo" to="/"></NavLink>
      </div>
    </div>
  </header>
);
