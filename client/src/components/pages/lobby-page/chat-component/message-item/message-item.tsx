import { CustomAvatar } from '@components/ui/customAvatar/customAvatar';
import { Card, CardContent, CardHeader, makeStyles, Typography } from '@material-ui/core';
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
    padding: '10px',
    height: 'auto',
    width: 'auto',
    backgroundColor: ({ isCurrentUser }: StyleProps) => (isCurrentUser ? '#ffc482' : '#fff'),
  },
});

const MessageItem = ({
  firstName,
  lastName,
  avatarImage,
  message,
  isCurrentUser,
}: IMessageCard) => {
  const nameWithoutLastName = lastName ? `${firstName} ${lastName}` : firstName;
  const classes = useStyles({ isCurrentUser });
  const messageCardStyles = `issue-card ${classes.card}`;
  return (
    <div className="message-item-container">
      <Card className={messageCardStyles}>
        <div className="message-user">
          <CustomAvatar firstName={firstName} lastName={lastName} avatarImage={avatarImage} />
          <CardHeader className="message-card-header" title={nameWithoutLastName} />
        </div>
        <div className="message-msg">
          {' '}
          <CardContent>
            <Typography variant="body2">{message}</Typography>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default MessageItem;
