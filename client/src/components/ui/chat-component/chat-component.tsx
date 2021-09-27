import MessageList from '@components/ui/chat-component/message-list/message-list';
import MessageForm from '@components/ui/chat-component/message-form/message-form';
import './chat-component.sass';

const Chat = () => (
  <div className="chat-container">
    <MessageList />
    <MessageForm />
  </div>
);

export default Chat;
