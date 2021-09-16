import { types } from '../actions';

export const clientReducer = (
  state = {
    clientUser: null,
  },
  { type, payload }
) => {
  switch (type) {
    case types.SET_CLIENT_USER: {
      return {
        ...state,
        clientUser: payload.user,
      };
    }

    default:
      return state;
  }
};
