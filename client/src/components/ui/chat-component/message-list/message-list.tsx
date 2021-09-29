import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import MessageItem from '@components/ui/chat-component/message-item/message-item';
import { IMessage, IUser } from '@models/types';
import config from '@src/config.json';
import './message-list.sass';

const MessageList = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messages: IMessage[] = useSelector((state: RootState) => state.chat.messages);
  const isLobby: boolean = useSelector(
    (state: RootState) => state.game.gameStatus === config.LOBBY
  );
  const roomID: string = useSelector((state: RootState) => state.game.room);
  const users: IUser[] = useSelector((state: RootState) => state.game.users);
  const client: IUser = useSelector((state: RootState) => state.client.clientUser as IUser);
  const dealer: IUser = useSelector((state: RootState) => state.game.dealer as IUser);

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
      {messages.map((msg) => {
        const isCurrentDealer = client.id === dealer.id;
        return (
          (dealer.id === msg.userID && (
            <MessageItem
              key={msg.messageID}
              messageID={msg.messageID}
              messageTime={msg.messageTime}
              room={roomID}
              userID={dealer.id}
              isLobby={isLobby}
              firstName={dealer.firstName}
              lastName={dealer.lastName}
              avatarImage={dealer.avatar}
              message={msg.message}
              isCurrentUser={isCurrentDealer}
            />
          )) ||
          users.map((user) => {
            const isCurrentUser = client.id === user.id;
            return (
              user.id === msg.userID && (
                <MessageItem
                  key={msg.messageID}
                  messageID={msg.messageID}
                  messageTime={msg.messageTime}
                  room={roomID}
                  userID={user.id}
                  isLobby={isLobby}
                  firstName={user.firstName}
                  lastName={user.lastName}
                  avatarImage={user.avatar}
                  message={msg.message}
                  isCurrentUser={isCurrentUser}
                />
              )
            );
          })
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
