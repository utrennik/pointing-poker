import { types } from '../actions';

export const gameReducer = (
  state = {
    gameID: null,
    users: [],
  },
  { type, payload }
) => {
  switch (type) {
    case types.SET_GAME_ID: {
      return {
        ...state,
        gameID: payload.gameID,
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

    default:
      return state;
  }
};
