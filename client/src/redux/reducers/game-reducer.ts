import { types } from '../actions';

const initialState = {
  users: [],
  title: '',
  room: '',
  dealer: {},
  settings: {},
  gameStatus: '',
  issues: [],
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
      return {
        ...state,
        issues: payload.issues,
      };
    }

    default:
      return state;
  }
};
