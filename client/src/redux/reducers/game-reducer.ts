import config from '@src/config.json';
// import { IssuePriority } from '@models/types';
// import { IGame, IIssue } from '../../models/types';
import { types } from '../actions';

export const initialState = {
  users: [],
  title: '',
  room: '',
  dealer: {},
  settings: {},
  gameStatus: '',
  issues: [],
  currentIssue: {},
  isRoundRunning: false,
};

// TODO: For testing Game page TOP section, should be removed

// const testIssues: IIssue[] = [
//   {
//     id: '1',
//     name: 'Create welcome page',
//     description: 'Issue full description',
//     room: '123',
//     priority: IssuePriority.LOW,
//     isActive: true,
//     score: '',
//     votingData: [2, 4, 8, 8, 'coffee', 'pass'],
//   },

//   {
//     id: '2',
//     name: 'Create lobby page',
//     description: 'Issue full description',
//     room: '123',
//     priority: IssuePriority.NORMAL,
//     isActive: false,
//     score: '20',
//   },

//   {
//     id: '3',
//     name: 'Create game page',
//     description: 'Issue full description',
//     room: '123',
//     priority: IssuePriority.HIGH,
//     isActive: false,
//     score: '',
//   },
// ];

// const testInitialState: IGame = {
//   users: [],
//   title: 'My Game Title',
//   room: 'abcd',
//   dealer: {
//     firstName: 'Alejandro',
//     lastName: 'Sanchez',
//   },
//   settings: {},
//   gameStatus: 'poker',
//   timer: 20,
//   issues: testIssues,
//   currentIssue: testIssues[0],
// };

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

      if (!newIssues.length) {
        return {
          ...state,
          issues: newIssues,
          currentIssue: {},
        };
      }

      const isCurrentIssue = !!state.currentIssue.id;
      const isCurrentIssueInArrray = !!newIssues.filter(
        (issue) => issue.id === state.currentIssue.id
      )[0];

      if (!isCurrentIssue || !isCurrentIssueInArrray) {
        const defaultActiveIssue = newIssues[0];
        if (defaultActiveIssue) defaultActiveIssue.isActive = true;

        return {
          ...state,
          issues: newIssues,
          currentIssue: defaultActiveIssue,
        };
      }

      if (isCurrentIssueInArrray) {
        const activeIssueInArray = newIssues.find((issue) => issue.id === state.currentIssue.id);
        activeIssueInArray.isActive = true;
      }

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

    default:
      return state;
  }
};
