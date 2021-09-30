import { Card, CardHeader, makeStyles, Theme } from '@material-ui/core';
import { IIssueCardStatus } from '@models/types';

interface IStyleProps {
  roleInGame: string;
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
  },
});

export const IssueCardStatus = ({ score, cardValueScore, roleInGame }: IIssueCardStatus) => {
  const styles = useStyles({ roleInGame });

  const issueScore = score || 'in progress';

  const resultOfVoiting = roleInGame === 'observer' ? ' -' : issueScore;

  return (
    <Card className={styles.card}>
      <CardHeader className={styles.status} title={resultOfVoiting} />
      <CardHeader title={cardValueScore} titleTypographyProps={{ variant: 'h6' }} />
    </Card>
  );
};
