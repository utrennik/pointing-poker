import { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, IconButton } from '@material-ui/core';
import { RootState } from 'src/redux/store';
import { IIssueCard, IIssueDelete } from '@models/types';
import { WebSocketContext } from '@models/web-socket';
import { truncateString } from '@utils/stringUtils';
import EditIssueModal from '@components/modals/edit-issue-modal/edit-issue-modal';
import config from '@src/config.json';
import './issueCard.sass';

export const IssueCard = ({
  id,
  name,
  priority,
  isActive,
  isGame,
  isDealer,
  isPlayed,
}: IIssueCard) => {
  const [editIssueModalOpen, setEditIssueModalOpen] = useState(false);
  const roomID: string = useSelector((state: RootState) => state.game.room);
  const ws = useContext(WebSocketContext);

  const handleEditIssueModalOpen = () => {
    setEditIssueModalOpen(true);
  };

  const handleEditIssueModalClose = () => {
    setEditIssueModalOpen(false);
  };

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.target);
    console.log(id);
  };

  const handleDelete = () => {
    const issueDeleteData: IIssueDelete = {
      id,
      room: roomID,
    };
    ws.requestDeleteIssue(issueDeleteData);
  };

  return (
    <div title={name}>
      <Card
        className={
          (isActive && isPlayed && 'issue-card selected played') ||
          (isActive && 'issue-card selected') ||
          (isPlayed && 'issue-card played') ||
          'issue-card'
        }
      >
        <CardHeader
          className="issue-card-header"
          title={truncateString(name, config.ISSUE_TITLE_MAX_SYMBOLS)}
          subheader={truncateString(priority)}
          subheaderTypographyProps={{ variant: 'subtitle1' }}
        />
        {isGame && isDealer ? (
          <IconButton className="issue-card-close-btn" onClick={handleClose} />
        ) : (
          isDealer && [
            <IconButton className="issue-card-edit-btn" onClick={handleEditIssueModalOpen} />,
            <IconButton className="issue-card-delete-btn" onClick={handleDelete} />,
          ]
        )}
        <EditIssueModal
          isOpen={editIssueModalOpen}
          onClose={handleEditIssueModalClose}
          issueID={id}
          name={name}
          priority={priority}
        />
      </Card>
    </div>
  );
};
