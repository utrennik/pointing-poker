import { types } from '../actions';

export const clientReducer = (
  state = {
    clientUser: null,
<<<<<<< HEAD
=======
    isDealerLobby: false,
>>>>>>> 8d5cffa6437c25673a957437a8df58cc41ff41d0
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

<<<<<<< HEAD
=======
    case types.SET_IS_DEALER_LOBBY: {
      return {
        ...state,
        isDealerLobby: payload.isDealer,
      };
    }

>>>>>>> 8d5cffa6437c25673a957437a8df58cc41ff41d0
    default:
      return state;
  }
};
