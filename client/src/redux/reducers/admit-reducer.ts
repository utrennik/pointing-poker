import { types } from '../actions';

const initialState = {
  isAdmitOpen: false,
  admitUser: {},
};

export const admitReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_ADMIT_OPEN: {
      return {
        ...state,
        isAdmitOpen: payload,
      };
    }

    case types.SET_ADMIT_USER: {
      return {
        ...state,
        admitUser: payload.admitUser,
      };
    }

    default:
      return state;
  }
};
