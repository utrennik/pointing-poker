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
              <div
                tabIndex={0}
                role="button"
                className="chat-icon"
                aria-label="Open chat"
                onClick={onChatClickHandler}
                onKeyDown={onChatClickHandler}
              />
            </div>
          </div>
        </div>
        <div className="header-down">
          <div className="container logo-wrapper">
            <NavLink exact className="logo" to="/" />
          </div>
        </div>
        {isChatOpen && <Chat />}
      </header>
    </>
  );
};

export default Header;
