import { NavLink } from 'react-router-dom';

import '@styles/header.sass';

const Header = () => {
  const onChatClickHandler = () => {
    const toggleChat = () => {
      const chat = document.querySelector('.aside-container');
      if (chat) {
        chat.classList.toggle('aside-container--active');
      }
    };

    toggleChat();

    const scrollChatToBottom = () => {
      const messages = document.querySelector('.message-list-container');
      if (messages) {
        messages.scrollTop = messages.scrollHeight;
      }
    };

    scrollChatToBottom();
  };
  return (
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
    </header>
  );
};

export default Header;
