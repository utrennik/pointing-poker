import { Card, CardHeader, makeStyles, Typography } from '@material-ui/core';
import { IScramMasterCard } from '@models/types';
import { truncateString } from '@utils/stringUtils';
import { CustomAvatar } from '../customAvatar/customAvatar';
import config from '../../../config.json';
import './scram-master-card.sass';

const useStyles = makeStyles({
  header: {
    padding: '0',
  },
});

export const ScramMasterCard = ({
  firstName,
  lastName,
  role,
  avatarImage,
  isScramMasterLobby,
}: IScramMasterCard) => {
  const nameWithoutLastName = truncateString(
    lastName ? `${firstName} ${lastName}` : firstName,
    config.truncateSettings.maxSymbolsValueTitle
  );

  const classes = useStyles();

  return (
    <Card className="scram-master-card">
      <CustomAvatar firstName={firstName} lastName={lastName} avatarImage={avatarImage} />
      <div className="scram-master-card-description">
        <Typography variant="body2" className="scram-master-subheader">
          {isScramMasterLobby ? "IT'S YOU" : ''}
        </Typography>
        <CardHeader
          className={classes.header}
          title={nameWithoutLastName}
          content={role}
          subheader={truncateString(role, config.truncateSettings.maxSymbolsValueSubtitle)}
          subheaderTypographyProps={{ variant: 'subtitle1' }}
        />
      </div>
    </Card>
  );
};
