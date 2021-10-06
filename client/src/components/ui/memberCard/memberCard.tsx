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
  Theme,
} from '@material-ui/core';
import { WebSocketContext } from '@models/web-socket';
import { IMemberCard } from '@models/types';
import React, { useContext } from 'react';
import { truncateString } from '@utils/stringUtils';
import { Variant } from '@material-ui/core/styles/createTypography';
import { CustomAvatar } from '@components/ui/customAvatar/customAvatar';
import config from '../../../config.json';
import './memberCard.sass';

interface IStyleProps {
  widthCard: string;
  heightCard: string;
  widthHeader: string;
  widthAvatar: string;
  heightAvatar: string;
  nameTruncate: number;
  roleTruncate: number;
  titleTypography: string;
  subtitleTypography: string;
  gameRole?: string;
}
const defaultProps: IStyleProps = {
  widthCard: '280px',
  heightCard: '76px',
  widthHeader: '200px',
  nameTruncate: config.truncateSettings.maxSymbolsValueTitle,
  roleTruncate: config.truncateSettings.maxSymbolsValueSubtitle,
  titleTypography: 'h5',
  subtitleTypography: 'subtitle1',
  widthAvatar: '50px',
  heightAvatar: '50px',
};

const useStyles = makeStyles<Theme, IStyleProps>({
  dialogTitle: {
    textAlign: 'center',
  },
  dialogActions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  card: {
    width: (props) => props.widthCard,
    height: (props) => props.heightCard,
    padding: '0 10px 0 10px',
    display: 'flex',
    columnGap: '10px',
    alignItems: 'center',
    justifyContent: 'space-between',
    opacity: (props) => (props.gameRole === config.OBSERVER ? '0.8' : '1'),
  },
  header: {
    width: (props) => props.widthHeader,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    padding: '5px',
  },
});

export const MemberCard = ({
  firstName,
  lastName,
  role,
  avatarImage,
  id,
  isRemoveButtonDisabled,
  stylesProps = defaultProps,
  gameRole = 'member',
}: IMemberCard) => {
  const [deleteUserModalOpen, setDeleteUserModalOpen] = React.useState<boolean>(false);
  const styles = { ...stylesProps, gameRole };
  const classes = useStyles(styles);
  const ws = useContext(WebSocketContext);

  const handleDelete = () => {
    setDeleteUserModalOpen(!deleteUserModalOpen);
  };

  const handleDeleteAgree = () => {
    setDeleteUserModalOpen(!deleteUserModalOpen);
    ws.requestUserDelete(id);
  };

  const nameWithoutLastName = truncateString(
    lastName ? `${firstName} ${lastName}` : firstName,
    stylesProps.nameTruncate
  );

  return (
    <Card className={classes.card}>
      <CustomAvatar
        firstName={firstName}
        lastName={lastName}
        avatarImage={avatarImage}
        stylesProps={{ width: stylesProps.widthAvatar, height: stylesProps.heightAvatar }}
      />
      <CardHeader
        className={classes.header}
        title={nameWithoutLastName}
        titleTypographyProps={{ variant: stylesProps.titleTypography as Variant }}
        subheader={role ? truncateString(role, stylesProps.roleTruncate) : ''}
        subheaderTypographyProps={{ variant: stylesProps.subtitleTypography as Variant }}
      />
      <IconButton
        className="member-card-delete-btn"
        onClick={handleDelete}
        disabled={isRemoveButtonDisabled}
      />
      <Dialog className="modal-dialog" open={deleteUserModalOpen} onClose={handleDelete}>
        <DialogTitle className={classes.dialogTitle}>Kick player?</DialogTitle>
        <DialogContent>
          Are you really want to remove {`${firstName} ${lastName}`} from game session?
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
