import { types } from '../actions';

export const gameReducer = (
  state = {
    users: [],
    title: '',
    settings: {},
  },
  { type, payload }
) => {
  switch (type) {
    case types.SET_GAME: {
      return {
        ...state,
        users: payload.users,
        title: payload.title,
        settings: payload.settings,
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
