import { SET_STATE } from '../actions/User';

export const user = (state = {}, action: any) => {
  switch (action.type) {
    case 'USER':
      return {
        ...state, ...action.state};
    case 'user':
      return {
        ...state, ...action.state};
    default:
      return state;
  }
};
