import { Card, CardHeader, makeStyles, Typography } from '@material-ui/core';
import { IScramMasterCard } from '@models/types';
import { CustomAvatar } from '../customAvatar/customAvatar.tsx';
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
}: // isScramMasterLobby,
IScramMasterCard) => {
  const nameWithoutLastName = lastName ? `${firstName} ${lastName}` : firstName;

  const classes = useStyles();

  return (
    <Card className="scram-master-card">
      <CustomAvatar firstName={firstName} lastName={lastName} avatarImage={avatarImage} />
      {/* {isScramMasterLobby && ( */}
      <div className="scram-master-card-description">
        <Typography variant="body2" className="scram-master-subheader">
          IT'S YOU
        </Typography>
        {/* )} */}
        <CardHeader
          className={classes.header}
          // className="scram-master-header"
          title={nameWithoutLastName}
          content={role}
          subheader={role}
          subheaderTypographyProps={{ variant: 'subtitle1' }}
        />
      </div>
    </Card>
  );
};
