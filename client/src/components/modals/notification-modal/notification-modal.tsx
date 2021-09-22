import { useContext } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
} from '@material-ui/core';
import { WebSocketContext } from '@models/web-socket';

const useStyles = makeStyles({
  dialogTitle: {
    textAlign: 'center',
  },
  dialogActions: {
    display: 'flex',
    justifyContent: 'end',
  },
});

export const NotificationModal = () => {
  const ws = useContext(WebSocketContext);

  const classes = useStyles();

  const handleClose = () => {
    ws.setNotification('');
  };

  return (
    <Dialog className="modal-dialog" open={!!ws.notification} onClose={handleClose}>
      <DialogTitle className={classes.dialogTitle}>Notification</DialogTitle>
      <DialogContent>{ws.notification}</DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button color="primary" variant="contained" onClick={handleClose}>
          Ok, I got it!
        </Button>
      </DialogActions>
    </Dialog>
  );
};
