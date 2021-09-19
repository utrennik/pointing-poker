import { types } from '../actions';

export const gameReducer = (
  state = {
    users: [],
    title: '',
<<<<<<< HEAD
    settings: {},
=======
    room: '',
    dealer: {},
    settings: {},
    gameStatus: '',
>>>>>>> 8d5cffa6437c25673a957437a8df58cc41ff41d0
  },
  { type, payload }
) => {
  switch (type) {
    case types.SET_GAME: {
      return {
        ...state,
<<<<<<< HEAD
        users: payload.users,
        title: payload.title,
        settings: payload.settings,
=======
        ...payload.game,
>>>>>>> 8d5cffa6437c25673a957437a8df58cc41ff41d0
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

<<<<<<< HEAD
=======
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

>>>>>>> 8d5cffa6437c25673a957437a8df58cc41ff41d0
    default:
      return state;
  }
};
