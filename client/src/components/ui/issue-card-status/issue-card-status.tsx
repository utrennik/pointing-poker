import { Card, CardHeader, makeStyles } from '@material-ui/core';
import { title } from 'process';

const useStyles = makeStyles({
  card: {
    width: '190px',
    height: '50px',
  },
});

export interface IIssueCardStatus {
  score: string;
  cardValue: string;
  cardValueScore: string;
}



const IssueCardStatus = ({score}: IIssueCardStatus) => {
  const styles = useStyles();

  return <Card className={styles.card}>
    <CardHeader title={score}/>
    </Card >
};
