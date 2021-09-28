import { Card, CardHeader, makeStyles, Theme } from '@material-ui/core';
import { IIssueCardStatus } from '@models/types';

interface IStyleProps {
  score?: string;
}

const useStyles = makeStyles<Theme, IStyleProps>({
  card: {
    width: '190px',
    height: '50px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  status: {
    width: '120px',
    textAlign: 'center',
    opacity: (props) => (props.score ? '1' : '0.3'),
  },
});

export const IssueCardStatus = ({ score, cardValueScore }: IIssueCardStatus) => {
  const styles = useStyles({ score });

  const issueStatus = score || 'In progress';

  return (
    <Card className={styles.card}>
      <CardHeader className={styles.status} title={issueStatus} />
      <CardHeader title={cardValueScore} titleTypographyProps={{ variant: 'h6' }} />
    </Card>
  );
};
