import { Card, CardHeader, IconButton, makeStyles } from '@material-ui/core';
import { IIssueCard } from '@models/types';
import { truncateString } from '@utils/stringUtils';
import './issueCard.sass';

interface StyleProps {
  isSelected: boolean;
}

const useStyles = makeStyles({
  card: {
    backgroundColor: ({ isSelected }: StyleProps) => (isSelected ? '#60DABF' : '#fff'),
  },
});

export const IssueCard = ({ name, priority, isSelected, isGame }: IIssueCard) => {
  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.target);
  };

  const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.target);
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.target);
  };

  const classes = useStyles({ isSelected });
  const isueCardStyles = `issue-card ${classes.card}`;

  return (
    <Card className={isueCardStyles}>
      <CardHeader
        className="issue-card-header"
        title={truncateString(name)}
        subheader={truncateString(priority)}
        subheaderTypographyProps={{ variant: 'subtitle1' }}
      />
      {isGame ? (
        <IconButton className="issue-card-close-btn" onClick={handleClose} />
      ) : (
        [
          <IconButton className="issue-card-edit-btn" onClick={handleEdit} />,
          <IconButton className="issue-card-delete-btn" onClick={handleDelete} />,
        ]
      )}
    </Card>
  );
};
