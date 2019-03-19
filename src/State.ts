import { store } from "./Store";

export const addReducer = ({ _store, type, customFunction = false }: any) => {
  const defaultFunction = (_state = {}, action: any) => {
    switch (action.type) {
      case `${type}`:
        return action.merge
          ? {
              ..._state,
              ...action.state
            }
          : action.state;
      default:
        return _state;
    }
  };
  _store.addReducers({
    [type]: customFunction ? customFunction : defaultFunction
  });
};

export const setState = ({
  data,
  _store,
  type,
  config = { merge: true }
}: any) => {
  _store.dispatch({
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
