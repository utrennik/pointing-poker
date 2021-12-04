import { useSelector } from 'react-redux';
import { IssueCardStatus } from '@components/ui/issue-card-status/issue-card-status';
import { CardValue, IUser, IUserScore, Role } from '@models/types';
import { id } from '@models/utils';
import { RootState } from 'src/redux/store';

export const ScoreSection = () => {
  const users: IUser[] = useSelector((state: RootState) => state.game.users);
  const isFlipped: boolean = useSelector((state: RootState) => state.game.isFlipped);
  const isDealer: boolean = useSelector(
    (state: RootState) => state.client.clientUser.role === Role.DEALER
  );
  const members = users.filter((user: IUser) => user.role === Role.MEMBER);
  const units: string = useSelector(
    (state: RootState) => state.game.settings.unitsOfEstimation.scoreTypeShort
  );
  const userScoreData: IUserScore[] = useSelector(
    (state: RootState) => state.game.currentIssue.userScore
  );
  const DEFAULT_SCORE = '---';
  const votingData: string[] = members.map((member: IUser) => {
    if (!userScoreData) return DEFAULT_SCORE;
    const scoreDataItem: IUserScore | undefined = userScoreData.find(
      (userScore) => userScore.userID === member.id
    );
    return scoreDataItem?.score || DEFAULT_SCORE;
  });
  const isScoreHidden: boolean = !(isDealer || isFlipped);

  return (
    <div className="players-section-items">
      <div className="players-section-title">Score:</div>
      {votingData.map((item) => (
        <IssueCardStatus
          key={id()}
          score={item}
          isScoreHidden={isScoreHidden}
          cardValueScore={
            item !== CardValue.COFFEE && item !== CardValue.PASS && item !== DEFAULT_SCORE
              ? units
              : ''
          }
        />
      ))}
    </div>
  );
};
