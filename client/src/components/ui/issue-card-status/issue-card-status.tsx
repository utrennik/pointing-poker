import { Card, CardHeader, makeStyles } from '@material-ui/core';
import { IIssueCardStatus } from '@models/types';

const useStyles = makeStyles({
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
  },
});

export const IssueCardStatus = ({ score, cardValueScore }: IIssueCardStatus) => {
  const styles = useStyles();

  const issueScore = score || 'in progress';

  return (
    <Card className={styles.card}>
      <CardHeader className={styles.status} title={issueScore} />
      <CardHeader title={cardValueScore} titleTypographyProps={{ variant: 'h6' }} />
    </Card>
  );
};
