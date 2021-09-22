import { types } from '../actions';

const initialState = {
  socketError: false,
};

export const socketReducer = (state = initialState, { type }) => {
  switch (type) {
    case types.SOCKET_CONNECTED: {
      return {
        ...state,
        socketError: false,
      };
    }

    case types.SOCKET_DISCONNECTED: {
      return {
        ...state,
        socketError: true,
      };
    }

    default:
      return state;
  }
};
