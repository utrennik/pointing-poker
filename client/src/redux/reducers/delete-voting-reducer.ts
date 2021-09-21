import { types } from '../actions';

export const deleteVotingReducer = (
  state = {
    isVoting: false,
    deleteVotingModalOpen: false,
    deleteVotingData: {
      removerUserID: '',
      removerUserFullName: '',
      deleteUserID: '',
      deleteUserFullName: '',
    },
  },
  { type, payload }
) => {
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
        isVoting: false,
        deleteVotingModalOpen: false,
        deleteVotingData: {
          removerUserID: '',
          removerUserFullName: '',
          deleteUserID: '',
          deleteUserFullName: '',
        },
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
