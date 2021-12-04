import { Card, CardHeader, makeStyles } from '@material-ui/core';
import { CardValue, IIssueCardStatus } from '@models/types';
import coffeeIcon from '@assets/icons/coffee.svg';

const useStyles = makeStyles({
  card: {
    minWidth: '100px',
    height: '50px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  status: {
    minWidth: '50px',
    textAlign: 'center',
  },
});

export const IssueCardStatus = ({ score, cardValueScore, isScoreHidden }: IIssueCardStatus) => {
  const styles = useStyles();
  const DEFAULT_VALUE = '--';
  const coffeeImg = (
    <div className="score-coffee-icon">
      <img src={coffeeIcon} alt="" />
    </div>
  );

  const issueScore: string = score || DEFAULT_VALUE;
  const isCoffee: boolean = score === CardValue.COFFEE;

  return (
    <Card className={styles.card}>
      {!isScoreHidden && isCoffee ? (
        coffeeImg
      ) : (
        <CardHeader className={styles.status} title={isScoreHidden ? DEFAULT_VALUE : issueScore} />
      )}
      <CardHeader
        title={isScoreHidden ? DEFAULT_VALUE : cardValueScore}
        titleTypographyProps={{ variant: 'h6' }}
      />
    </Card>
  );
};
