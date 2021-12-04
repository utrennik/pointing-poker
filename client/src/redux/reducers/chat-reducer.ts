import { types } from '../actions';

const initialState = {
  messages: [],
  unreadMessages: 0,
  isOpen: false,
};

export const chatReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_MESSAGES: {
      const oldMessagesQuantity = state.messages.length;
      const newMessages = payload.messages;
      const unreadMessages = state.isOpen
        ? 0
        : state.unreadMessages + (newMessages.length - oldMessagesQuantity);

      return {
        ...state,
        messages: newMessages,
        unreadMessages,
      };
    }

    case types.RESET_UNREAD_MESSAGES: {
      return {
        ...state,
        unreadMessages: 0,
      };
    }

    case types.SET_CHAT_ISOPEN: {
      return {
        ...state,
        isOpen: payload.isOpen,
      };
    }

    default:
      return state;
  }
};
