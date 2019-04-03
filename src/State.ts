import { store } from "./Store";

const genericReducer = (type: string) => (
  _state = {},
  action: { merge: true; state: any; type: string }
) => {
  switch (action.type) {
    case type:
      return !action.merge
        ? action.state
        : {
            ..._state,
            ...action.state
          };

    default:
      return _state;
  }
};

export const addReducer = ({ _store, type, customFunction = false }: any) => {
  _store = _store || store;
  _store.addReducers({
    [type]: customFunction || genericReducer(type)
  });
};

export const setState = ({ data, _store, type, merge = true }: any) => {
  _store = _store || store;
  _store.dispatch({
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
