import { NavLink } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@src/redux/store';
import { resetUnreadMessages, setChatIsOpen } from '@src/redux/actions';
import Chat from '@components/ui/chat-component/chat-component';
import config from '@src/config';
import './header.sass';

const Header = () => {
  const unreadMessages: number = useSelector((state: RootState) => state.chat.unreadMessages);
  const isChatOpen: number = useSelector((state: RootState) => state.chat.isOpen);
  const isLoggedIn: boolean = useSelector((state: RootState) => !!state.game.gameStatus);
  const dispatch = useDispatch();
  const chatRef = useRef(null);

  const handleOutsideClick = (e) => {
    if (chatRef && !chatRef.current.contains(e.target)) {
      dispatch(setChatIsOpen(false));
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick, false);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick, false);
    };
  }, []);

  const onChatClickHandler = () => {
    if (!isChatOpen) {
      dispatch(setChatIsOpen(true));
      dispatch(resetUnreadMessages());
    } else {
      dispatch(setChatIsOpen(false));
    }
  };

  return (
    <>
      <header className="header">
        <div className="header-up">
          <div className="container header-up-wrapper">
            {isLoggedIn && (
              <div
                className="chat-wrapper"
                role="button"
                aria-label="Open chat"
                onClick={onChatClickHandler}
                onKeyDown={onChatClickHandler}
                tabIndex={0}
              >
                <div className="chat-icon">
                  {!!unreadMessages && (
                    <div className="messages-badge">
                      {unreadMessages > config.MAX_UNREAD_MESSAGES_BADGE
                        ? `${config.MAX_UNREAD_MESSAGES_BADGE}+`
                        : unreadMessages}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="header-down">
          <div className="logo-wrapper">
            <NavLink exact className="logo" to="/" />
          </div>
        </div>

        <div ref={chatRef}>{isChatOpen && <Chat />}</div>
      </header>
    </>
  );
};

export default Header;
