export const addReducer = ({ store, type, customFunction = false }: any) => {
  const defaultFunction = (state = {}, action: any) => {
    switch (action.type) {
      case `${type}`:
        return action.merge
          ? {
              ...state,
              ...action.state
            }
          : action.state;
      default:
        return state;
    }
  };
  store.addReducers({
    [type]: customFunction ? customFunction : defaultFunction
  });
};
