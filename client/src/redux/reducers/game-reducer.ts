import config from '@src/config.json';
import { types } from '../actions';

export const initialState = {
  users: [],
  title: '',
  room: '',
  dealer: {},
  settings: {
    room: '',
    isDealerPlayer: false,
    cardSet: [],
    isFreeConnectionToGameForNewUsers: false,
    isChangeChoiceAfterFlip: false,
    isRevoteAfterRoundEnd: false,
    timer: null,
    isSetIssuesFromFile: false,
    IsAutoreverseCards: false,
    unitsOfEstimation: {
      scoreType: '',
      scoreTypeShort: '',
    },
    coverCardforServer: {},
  },
  gameStatus: '',
  issues: [],
  currentIssue: {},
  isRoundRunning: false,
  isFlipped: false,
};

export const gameReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_GAME: {
      return {
        ...state,
        ...payload.game,
      };
    }

    case types.ADD_USER: {
      const newUsers = state.users.slice();
      newUsers.push(payload.user);
      return {
        ...state,
        users: newUsers,
      };
    }

    case types.DELETE_USER: {
      const newUsers = state.users.filter((user) => user.id !== payload.userID);
      return {
        ...state,
        users: newUsers,
      };
    }

    case types.CHANGE_TITLE: {
      return {
        ...state,
        title: payload.title,
      };
    }

    case types.SET_ISSUES: {
      const newIssues = payload.issues;
      const currentIssueID = state.currentIssue.id;

      if (!newIssues.length) {
        return {
          ...state,
          issues: newIssues,
          currentIssue: {},
        };
      }

      newIssues.forEach((issue) => {
        if (issue.id === currentIssueID) {
          issue.isActive = true;
        } else {
          issue.isActive = false;
        }
      });

      return {
        ...state,
        issues: newIssues,
      };
    }

    case types.SET_GAME_STATUS: {
      return {
        ...state,
        gameStatus: payload.gameStatus,
      };
    }

    case types.SET_POKER_GAME_SETTINGS: {
      return {
        ...state,
        gameStatus: config.POKER,
        settings: { ...payload },
      };
    }

    case types.SET_CURRENT_ISSUE: {
      let selectedIssue;
      const selectedIssueID = payload.issueID;

      const newIssues = state.issues.slice();

      newIssues.forEach((issue) => {
        if (issue.id === selectedIssueID) {
          selectedIssue = issue;
          issue.isActive = true;
        } else {
          issue.isActive = false;
        }
      });

      if (selectedIssue) {
        return {
          ...state,
          currentIssue: selectedIssue,
          issues: newIssues,
        };
      }

      return state;
    }

    case types.SET_IS_ROUND_RUNNING: {
      return {
        ...state,
        isRoundRunning: payload.isRoundRunning,
      };
    }

    case types.SET_ROUND_VOTE_RESULTS: {
      const { currentIssue } = state;

      return {
        ...state,
        currentIssue: {
          ...currentIssue,
          userScore: payload.roundVoteResults.score,
        },
      };
    }

    case types.SET_IS_FLIPPED: {
      return {
        ...state,
        isFlipped: payload.isFlipped,
      };
    }

    case types.SET_ISSUE_SCORE: {
      const { currentIssue } = state;
      const { scoreData } = payload;
      const newIssues = state.issues.slice().map((issue) => {
        if (issue.id === scoreData.issueID) {
          return { ...issue, score: scoreData.score };
        }
        return issue;
      });

      return {
        ...state,
        issues: newIssues,
        currentIssue: {
          ...currentIssue,
          score: scoreData.score,
        },
      };
    }

    default:
      return state;
  }
};
