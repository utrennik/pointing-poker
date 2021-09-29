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
    opacity: (props) => (props.roleInGame === "observer" ? '0.3' : '1'),
  },
  unit:{
    opacity: (props) => (props.roleInGame === "observer" ? '0.3' : '1')
  }
});

export const IssueCardStatus = ({ score, cardValueScore,roleInGame }: IIssueCardStatus) => {
  const styles = useStyles({ roleInGame });

  const issueScore = score ? score : 'in progress';

  const resultOfVoiting = roleInGame === "observer" ? " -" : issueScore;

  return (
    <Card className={styles.card}>
      <CardHeader className={styles.status} title={resultOfVoiting} />
      <CardHeader className={styles.unit} title={cardValueScore} titleTypographyProps={{ variant: 'h6' }} />
    </Card>
  );
};
