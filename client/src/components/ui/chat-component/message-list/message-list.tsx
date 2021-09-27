import { useEffect, useRef } from 'react';
import MessageItem from '@components/ui/chat-component/message-item/message-item';
import { id } from '@utils/utils';
import { messages } from '../message-item/message-itemData';
import './message-list.sass';

const MessageList = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
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
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
