import MessageList from '@components/pages/lobby-page/chat-component/message-list/message-list';
import MessageForm from '@components/pages/lobby-page/chat-component/message-form/message-form';
import './chat-component.sass';

const Chat = () => (
  <aside className="aside-container">
    <MessageList />
    <MessageForm />
  </aside>
);

export default Chat;
