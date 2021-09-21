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
import { setDeleteVotingModalOpen } from '@src/redux/actions';
import { WebSocketContext } from '@models/web-socket';
import { IUser, IUserDeleteVoteData } from '@models/types';

const useStyles = makeStyles({
  dialogTitle: {
    textAlign: 'center',
  },
  dialogActions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

export const DeleteVotingModal = () => {
  const isOpen: boolean = useSelector(
    (state: RootState) => state.deleteVoting.deleteVotingModalOpen
  );

  const deleteVotingData: IUserDeleteVoteData = useSelector(
    (state: RootState) => state.deleteVoting.deleteVotingData
  );

  const clientUser: IUser = useSelector((state: RootState) => state.client.clientUser);

  const classes = useStyles();
  const ws = useContext(WebSocketContext);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setDeleteVotingModalOpen(false));
  };

  const handleDeleteAgree = () => {
    dispatch(setDeleteVotingModalOpen(false));
    ws.requestDeleteVoteFinish(true);
  };

  const handleDeleteDeny = () => {
    dispatch(setDeleteVotingModalOpen(false));
    ws.requestDeleteVoteFinish(false);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle className={classes.dialogTitle}>{'Kick'}</DialogTitle>
      <DialogContent>
        {`${deleteVotingData.removerUserFullName} want to kick ${
          clientUser && deleteVotingData.deleteUserID === clientUser.id
            ? 'You :))'
            : deleteVotingData.deleteUserFullName || ''
        }
        . Are you agree with it?`}
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button variant="contained" onClick={handleDeleteDeny}>
          No
        </Button>
        <Button color="primary" variant="contained" onClick={handleDeleteAgree}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
