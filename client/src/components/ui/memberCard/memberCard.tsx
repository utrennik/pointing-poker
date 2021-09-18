import {
  Button,
  Card,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import { WebSocketContext } from '@models/web-socket';
import { IMemberCard } from '@models/types';
import React, { useContext } from 'react';
import { CustomAvatar } from '../customAvatar/customAvatar.tsx';
import './memberCard.sass';

const useStyles = makeStyles({
  dialogTitle: {
    textAlign: 'center',
  },
  dialogActions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

export const MemberCard = ({ firstName, lastName, role, avatarImage, id }: IMemberCard) => {
  const [deleteUserModalOpen, setDeleteUserModalOpen] = React.useState<boolean>(false);
  const classes = useStyles();
  const ws = useContext(WebSocketContext);

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event);
    setDeleteUserModalOpen(!deleteUserModalOpen);
  };

  const handleDeleteAgree = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.target);
    setDeleteUserModalOpen(!deleteUserModalOpen);
    ws.requestUserDelete(id);
  };

  const nameWithoutLastName = lastName ? `${firstName} ${lastName}` : firstName;

  return (
    <Card className="member-card">
      <CustomAvatar firstName={firstName} lastName={lastName} avatarImage={avatarImage} />
      <CardHeader
        className="member-card-header"
        title={nameWithoutLastName}
        subheader={role}
        subheaderTypographyProps={{ variant: 'subtitle1' }}
      />
      <IconButton className="member-card-delete-btn" onClick={handleDelete} />
      <Dialog open={deleteUserModalOpen} onClose={handleDelete}>
        <DialogTitle className={classes.dialogTitle}>{'Kick player?'}</DialogTitle>
        <DialogContent>
          Are you really want to remove {nameWithoutLastName} from game session?
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button variant="contained" onClick={handleDelete}>
            No
          </Button>
          <Button color="primary" variant="contained" onClick={handleDeleteAgree}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};
