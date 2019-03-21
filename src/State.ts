import { store } from "./Store";

const genericReducer = (type: string) => (
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
export const addReducer = ({ store, type, customFunction = false }: any) => {
  store.addReducers({
    [type]: customFunction || genericReducer(type)
  });
};

export const setState = ({ data, store, type, merge = true }: any) => {
  store.dispatch({
    type,
    state: data,
    merge
  });
};

export const get = () => store.getState();

export const state = {
  addReducer,
  get,
  set: setState
};
