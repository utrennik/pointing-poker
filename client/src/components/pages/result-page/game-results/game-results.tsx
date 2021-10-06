import { RootState } from 'src/redux/store';
import { useSelector } from 'react-redux';
import { Card, CardHeader, makeStyles, Typography } from '@material-ui/core';
import { id } from '@models/utils';
import { IIssue } from '@models/types';
import './game-result.sass';

const useStyles = makeStyles({
  issue: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    columnGap: '10px',
    padding: '5px 0px',
    width: '300px',
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

  const issues: IIssue[] = useSelector((state: RootState) => state.game.issues as IIssue[]);
  const scoreTypeShort: string = useSelector(
    (state: RootState) => state.game.settings.unitsOfEstimation.scoreTypeShort
  );

  return (
    <div className="results-container">
      {issues.map(
        (issue) =>
          issue.score && (
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
                    {`${issue.score} ${scoreTypeShort}`}
                  </Typography>
                  <Typography className={descriptionStyles} variant="body2">
                    {issue.description}
                  </Typography>
                </Card>
              </div>
            </div>
          )
      )}
    </div>
  );
};
