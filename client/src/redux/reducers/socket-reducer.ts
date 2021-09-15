import { types } from '../actions';

export const socketReducer = (
  state = {
    socketConnected: false,
  },
  { type }
) => {
  switch (type) {
    case types.SOCKET_CONNECTED: {
      return {
        ...state,
        socketConnected: true,
      };
    }

    case types.SOCKET_DISCONNECTED: {
      return {
        ...state,
        socketConnected: false,
      };
    }

    default:
      return state;
  }
};
