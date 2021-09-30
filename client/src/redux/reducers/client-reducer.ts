import config from '@src/config.json';
import { types } from '../actions';

// TODO: For GAME PAGE TEST

const testInitialState = {
  clientUser: {
    firstName: 'Alejandro',
    lastName: 'Sanchez',
    id: 123,
    role: config.DEALER,
  },
  isDealerLobby: false,
};

// const initialState = {
//   clientUser: null,
//   isDealerLobby: false,
// };

export const clientReducer = (state = testInitialState, { type, payload }) => {
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
