import { CustomAvatar } from '@components/ui/customAvatar/customAvatar';
import { Card, CardHeader, makeStyles, Typography } from '@material-ui/core';
import { IMessageCard } from '@models/types';
import '@styles/variables';
import './message-item.sass';

interface StyleProps {
  isCurrentUser: boolean;
}

const useStyles = makeStyles({
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    columnGap: '10px',
    padding: '5px',
    height: 'auto',
    width: 'auto',
    backgroundColor: ({ isCurrentUser }: StyleProps) => (isCurrentUser ? '#ffc482' : '#fff'),
  },
  content: {
    padding: '5px',
    wordBreak: 'break-all',
  },
  header: {
    width: '200px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    padding: '8px',
  },
});

const MessageItem = ({
  firstName,
  lastName,
  avatarImage,
  messageTime,
  message,
  isCurrentUser,
}: IMessageCard) => {
  const nameWithoutLastName = lastName ? `${firstName} ${lastName}` : firstName;

  const classes = useStyles({ isCurrentUser });

  const messageCardStyles = `issue-card ${classes.card}`;
  const messageHeaderStyles = classes.header;
  const messageContentStyles = classes.content;

  return (
    <div className="message-item-container">
      <Card className={messageCardStyles}>
        <div className="message-user">
          <CustomAvatar firstName={firstName} lastName={lastName} avatarImage={avatarImage} />
          <CardHeader
            className={messageHeaderStyles}
            title={nameWithoutLastName}
            subheader={messageTime}
          />
        </div>
        <div className="message-msg">
          <Typography className={messageContentStyles} variant="body2">
            {message}
          </Typography>
        </div>
      </Card>
    </div>
  );
};

export default MessageItem;
