import { Avatar, makeStyles } from '@material-ui/core';
import { ICustomAvatar } from '@models/types';
import './customAvatar.sass';

const useStyles = makeStyles({
  customAvatar: {
    backgroundColor: '#60DABF',
    width: '50px',
    height: '50px',
  },
});

export const CustomAvatar = ({ lastName, firstName, avatarImage }: ICustomAvatar) => {
  const classes = useStyles();

  const avatarName = lastName
    ? `${firstName.match(/^./i)}${lastName.match(/^./i)}`.toUpperCase()
    : `${firstName.match(/^./i)}${firstName.match(/.$/i)}`.toUpperCase();

  return (
    <Avatar
      className={classes.customAvatar}
      alt={lastName ? `${firstName} ${lastName}` : firstName}
      src={avatarImage}
    >
      {avatarName}
    </Avatar>
  );
};
