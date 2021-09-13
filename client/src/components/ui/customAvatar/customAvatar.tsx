import { Avatar } from '@material-ui/core';
import { ICustomAvatar } from '@models/types';

export const CustomAvatar = ({ lastName, firstName, avatarImage }: ICustomAvatar) => {
  const avatarName = lastName
    ? `${firstName.match(/^./i)}${lastName.match(/^./i)}`.toUpperCase()
    : `${firstName.match(/^./i)}${firstName.match(/.$/i)}`.toUpperCase();

  return (
    <Avatar
      style={{ backgroundColor: '#60DABF', width: '50px', height: '50px' }}
      alt={lastName ? `${firstName} ${lastName}` : firstName}
      src={avatarImage}
    >
      {avatarName}
    </Avatar>
  );
};
