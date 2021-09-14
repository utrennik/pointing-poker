import { Avatar } from '@material-ui/core';
import { ICustomAvatar } from '@models/types';
import './customAvatar.sass';

export const CustomAvatar = ({ lastName, firstName, avatarImage }: ICustomAvatar) => {
  const avatarName = lastName
    ? `${firstName.match(/^./i)}${lastName.match(/^./i)}`.toUpperCase()
    : `${firstName.match(/^./i)}${firstName.match(/.$/i)}`.toUpperCase();

  return (
    <Avatar
      className="custom-avatar"
      alt={lastName ? `${firstName} ${lastName}` : firstName}
      src={avatarImage}
    >
      {avatarName}
    </Avatar>
  );
};
