// TODO: Uncomment in case of implementation of statistics cards
// import { StatsItem } from '@components/pages/game-page/game-round-section/stats-item/stats-item';
import { Card, CardHeader, makeStyles, Typography } from '@material-ui/core';
import { id } from '@models/utils';
import { testIssues /* gameResults */ } from './vote-resultsData';
import './game-result.sass';

const useStyles = makeStyles({
  issue: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    columnGap: '10px',
    padding: '5px 0px',
    maxWidth: '300px',
  },
  header: {
    fontWeight: 700,
  },
  description: {
    display: 'flex',
    padding: '5px 16px',
    wordBreak: 'break-all',
  },
});

export const GameResults = () => {
  const classes = useStyles();
  const issueStyles = classes.issue;
  const headerStyles = classes.header;
  const descriptionStyles = classes.description;

  const issues = testIssues;

  return (
    <div className="results-container">
      {/* // TODO: Uncomment in case of implementation of statistics cards
      {gameResults.map((gameResult) => */}
      {
        issues.map((issue) => (
          // issue.id === gameResult.issueID && (
          <div key={issue.id} className="result-container">
            <div className="issue-container">
              <Card key={id()} className={issueStyles}>
                <CardHeader
                  variant="h4"
                  className={headerStyles}
                  title={issue.name}
                  subheader={issue.priority}
                  subheaderTypographyProps={{
                    variant: 'subtitle1',
                    color: 'primary',
                  }}
                />
                <Typography className={descriptionStyles} variant="h4" color="primary">
                  {issue.score}
                </Typography>
                <Typography className={descriptionStyles} variant="body2">
                  {issue.description}
                </Typography>
              </Card>
            </div>
            {/* <div className="vote-container">
                  {gameResult.issueID &&
                    gameResult.voteResult.map((voteResultItem) => (
                      <StatsItem
                        key={id()}
                        score={voteResultItem.score}
                        percentage={voteResultItem.percentage}
                        pointsShortName="SP"
                      />
                    ))}
                </div> */}
          </div>
        ))
        // )
        // )}
      }
    </div>
  );
};
