import {
  Button,
  Card,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@material-ui/core';
import { IMemberCard } from '@models/types';
import React from 'react';
import { CustomAvatar } from '../customAvatar/customAvatar.tsx';
import './memberCard.sass';

export const MemberCard = ({ firstName, lastName, role, avatarImage }: IMemberCard) => {
  const [deleteUser, setDeleteUser] = React.useState<boolean>(false);

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event);
    setDeleteUser(!deleteUser);
  };

  const handleDeleteAgree = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.target);
    setDeleteUser(!deleteUser);
  };

  const nameWithoutLastName = lastName ? `${firstName} ${lastName}` : firstName;

  return (
    <Card className="member-card">
      <CustomAvatar firstName={firstName} lastName={lastName} avatarImage={avatarImage} />
      <CardHeader
        titleTypographyProps={{ variant: 'h6' }}
        style={{ padding: '0' }}
        className="member-card-header"
        title={nameWithoutLastName}
        subheader={role}
      />
      <IconButton className="member-card-delete-btn" onClick={handleDelete} />
      <Dialog open={deleteUser} onClose={handleDelete}>
        <DialogTitle style={{ textAlign: 'center' }}>{'Kick player?'}</DialogTitle>
        <DialogContent>
          Are you really want to remove {nameWithoutLastName} from game session?
        </DialogContent>
        <DialogActions style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" onClick={handleDelete}>
            Disagree
          </Button>
          <Button color="primary" variant="contained" onClick={handleDeleteAgree}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};
