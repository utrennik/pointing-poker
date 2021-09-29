import { types } from '../actions';

const initialState = {
  messages: [],
};

export const chatReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_MESSAGES: {
      return {
        ...state,
        messages: payload.messages,
      };
    }

    default:
      return state;
  }
};
