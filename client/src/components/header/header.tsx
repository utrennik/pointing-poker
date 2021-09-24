import { NavLink } from 'react-router-dom';

import '@styles/header.sass';
import Chat from '@components/ui/chat-component/chat-component';
import { useState } from 'react';

const Header = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const onChatClickHandler = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      <header className="header">
        <div className="header-up">
          <div className="container header-up-wrapper">
            <div className="chat-wrapper">
              <div className="chat-icon" onClick={onChatClickHandler}></div>
            </div>
          </div>
        </div>
        <div className="header-down">
          <div className="container logo-wrapper">
            <NavLink exact className="logo" to="/"></NavLink>
          </div>
        </div>
        {isChatOpen && <Chat />}
      </header>
    </>
  );
};

export default Header;
