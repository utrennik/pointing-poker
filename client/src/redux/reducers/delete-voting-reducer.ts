import { types } from '../actions';

const initialState = {
  isVoting: false,
  deleteVotingModalOpen: false,
  deleteVotingData: {
    removerUserID: '',
    removerUserFullName: '',
    deleteUserID: '',
    deleteUserFullName: '',
  },
};

export const deleteVotingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_DELETE_VOTING: {
      return {
        ...state,
        isVoting: true,
        deleteVotingModalOpen: true,
        ...payload,
      };
    }

    case types.RESET_DELETE_VOTING: {
      return {
        ...state,
        ...initialState,
      };
    }

    case types.SET_DELETE_VOTING_MODAL_OPEN: {
      return {
        ...state,
        deleteVotingModalOpen: payload,
      };
    }

    default:
      return state;
  }
};
