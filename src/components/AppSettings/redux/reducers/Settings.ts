export const settings = (state = {}, action: any) => {
  switch (action.type) {
    case 'settings':
      return {
        ...state, ...action.state};
    default:
      return state;
  }
};
