import { RootState } from 'src/redux/store';
import { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
} from '@material-ui/core';
import { setAdmitOpen } from '@src/redux/actions';
import { WebSocketContext } from '@models/web-socket';
import { IUser, IUserAdmitData } from '@models/types';

const useStyles = makeStyles({
  dialogTitle: {
    textAlign: 'center',
  },
  dialogActions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

export const AdmitModal = () => {
  const isOpen: boolean = useSelector((state: RootState) => state.admit.isAdmitOpen);
  const roomID: string = useSelector((state: RootState) => state.game.room);
  const admitUser: IUser = useSelector((state: RootState) => state.admit.admitUser);
  const admitUserFullName: string = `${admitUser.firstName} ${admitUser.lastName}`;

  const classes = useStyles();
  const ws = useContext(WebSocketContext);
  const dispatch = useDispatch();
  const admitData: IUserAdmitData = {
    roomID,
    user: admitUser,
    isAdmitted: true,
  };

  const handleAdmitAgree = () => {
    dispatch(setAdmitOpen(false));
    ws.requestAdmit(admitData);
  };

  const handleAdmitDeny = () => {
    dispatch(setAdmitOpen(false));
    ws.requestAdmit({ ...admitData, isAdmitted: false });
  };

  return (
    <Dialog className="modal-dialog" open={isOpen} onClose={handleAdmitDeny}>
      <DialogTitle className={classes.dialogTitle}>Admit user join</DialogTitle>
      <DialogContent>{`${admitUserFullName} wants to join the game. Are you agree?`}</DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button variant="contained" onClick={handleAdmitDeny}>
          No
        </Button>
        <Button color="primary" variant="contained" onClick={handleAdmitAgree}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
