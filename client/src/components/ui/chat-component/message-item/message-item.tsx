import { CustomAvatar } from '@components/ui/customAvatar/customAvatar';
import { IMessageCard } from '@models/types';
import './message-item.sass';

const MessageItem = ({
  firstName,
  lastName,
  avatarImage,
  messageTime,
  message,
  isCurrentUser,
}: IMessageCard) => {
  const nameWithoutLastName = lastName ? `${firstName} ${lastName}` : firstName;

  const itemClasses = isCurrentUser ? 'message-item message-item-current' : 'message-item';

  return (
    <div className="message-item-container">
      <div className={itemClasses}>
        <div className="message-user">
          <CustomAvatar firstName={firstName} lastName={lastName} avatarImage={avatarImage} />
          <div className="message-data">
            <div className="message-user-name">
              {isCurrentUser ? 'You:' : `${nameWithoutLastName}:`}
            </div>
            <div className="message-user-message">{message}</div>
          </div>
          <div className="message-user-time">{messageTime}</div>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
