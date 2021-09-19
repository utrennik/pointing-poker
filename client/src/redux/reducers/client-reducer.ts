import { types } from '../actions';

export const clientReducer = (
  state = {
    clientUser: null,
    isDealerLobby: false,
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

    case types.SET_IS_DEALER_LOBBY: {
      return {
        ...state,
        isDealerLobby: payload.isDealer,
      };
    }

    default:
      return state;
  }
};
