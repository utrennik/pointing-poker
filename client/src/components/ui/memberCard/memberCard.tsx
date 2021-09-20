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
import { IMemberCard } from '@models/types';
import React from 'react';
import { truncateString } from '@utils/stringUtils';
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

export const MemberCard = ({ firstName, lastName, role, avatarImage }: IMemberCard) => {
  const [deleteUser, setDeleteUser] = React.useState<boolean>(false);

  const classes = useStyles();

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event);
    setDeleteUser(!deleteUser);
  };

  const handleDeleteAgree = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.target);
    setDeleteUser(!deleteUser);
  };

  const nameWithoutLastName = truncateString(lastName ? `${firstName} ${lastName}` : firstName, 14);

  return (
    <Card className="member-card">
      <CustomAvatar firstName={firstName} lastName={lastName} avatarImage={avatarImage} />
      <CardHeader
        className="member-card-header"
        title={nameWithoutLastName}
        subheader={truncateString(role,28)}
        subheaderTypographyProps={{ variant: 'subtitle1' }}
      />
      <IconButton className="member-card-delete-btn" onClick={handleDelete} />
      <Dialog open={deleteUser} onClose={handleDelete}>
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
