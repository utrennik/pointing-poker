import { Avatar, makeStyles, Theme } from '@material-ui/core';
import { ICustomAvatar } from '@models/types';
import './customAvatar.sass';

type IStylesProps = {
  width: string;
  height: string;
};

const useStyles = makeStyles<Theme, IStylesProps>({
  customAvatar: {
    backgroundColor: '#60DABF',
    width: (props) => props.width,
    height: (props) => props.height,
  },
});

export const CustomAvatar = ({
  lastName,
  firstName,
  avatarImage,
  stylesProps = { width: '50px', height: '50px' },
}: ICustomAvatar) => {
  const classes = useStyles(stylesProps);

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
