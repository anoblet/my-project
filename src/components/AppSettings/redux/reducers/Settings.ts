export const settings = (state = {}, action: any) => {
  switch (action.type) {
    case 'SET_STATE':
      return {
        ...state, ...action.state};
    default:
      return state;
  }
};
