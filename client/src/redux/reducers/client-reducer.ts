// import config from '@src/config.json';
import { types } from '../actions';

const initialState = {
  clientUser: null,
  isDealerLobby: false,
};

// TODO: for testing Game component, should be removed

// const testInitialState = {
//   clientUser: {
//     role: config.DEALER,
//   },
// };

export const clientReducer = (state = initialState, { type, payload }) => {
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
