import { store } from "./Store";

export const addReducer = ({ store, type, customFunction = false }: any) => {
  const defaultFunction = (
    state = {},
    action: { merge: true; state: any; type: string }
  ) => {
    switch (action.type) {
      case type:
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
    [type]: customFunction || defaultFunction
  });
};

export const setState = ({
  data,
  store,
  type,
  config = { merge: true }
}: any) => {
  store.dispatch({
    type,
    state: data,
    merge: config.merge
  });
};

export const get = () => store.getState();

export const state = {
  addReducer,
  get,
  set: setState
};
