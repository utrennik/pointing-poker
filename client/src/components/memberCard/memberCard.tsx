import { Avatar, Card, CardHeader, IconButton } from '@material-ui/core';
import { IMemberCard } from '@models/types';
import React from 'react';
import './memberCard.sass';

export const MemberCard = ({ firstName, lastName, role, avatarImage }: IMemberCard) => {
  const avatarName = lastName
    ? `${firstName.match(/^./i)}${lastName.match(/^./i)}`.toUpperCase()
    : `${firstName.match(/^./i)}${firstName.match(/.$/i)}`;

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event);
  };

  return (
    <Card className="member-card">
      <Avatar
        className="member-card-avatar"
        style={{ backgroundColor: '#60DABF', width: '50px', height: '50px' }}
        alt={lastName ? `${firstName} ${lastName}` : firstName}
        src={avatarImage}
      >
        {avatarName}
      </Avatar>
      <CardHeader
        titleTypographyProps={{ variant: 'h6' }}
        style={{ padding: '0' }}
        className="member-card-header"
        title={lastName ? `${firstName} ${lastName}` : firstName}
        subheader={role}
      />
      <IconButton className="member-card-delete-btn" onClick={handleDelete} />
    </Card>
  );
};
