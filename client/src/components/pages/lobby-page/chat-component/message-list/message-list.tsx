import MessageItem from '@components/pages/lobby-page/chat-component/message-item/message-item';
import { id } from '@utils/utils';
import { messages } from '../message-item/message-itemData';
import './message-list.sass';

const MessageList = () => (
  <div className="message-list-container">
    {messages.map(({ firstName, lastName, avatarImage, message, isCurrentUser }) => {
      const messageID = id();
      return (
        <MessageItem
          key={messageID}
          firstName={firstName}
          lastName={lastName}
          avatarImage={avatarImage}
          message={message}
          isCurrentUser={isCurrentUser}
        />
      );
    })}
  </div>
);

export default MessageList;
