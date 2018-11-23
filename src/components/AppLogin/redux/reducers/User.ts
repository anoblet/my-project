import { SET_STATE } from '../actions/User';

export const user = (state = {}, action: any) => {
  switch (action.type) {
    case SET_STATE:
      return {
        ...state, ...action.state};
    default:
      return state;
  }
};
