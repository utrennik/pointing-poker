import { types } from '../actions';

export const socketReducer = (
  state = {
    socketError: false,
  },
  { type }
) => {
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
