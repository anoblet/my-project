import { store } from "./Store";

const defaultReducer = (state, action, type) => {

}

export const addReducer = ({ store, type, customFunction = false }: any) => {
  const defaultFunction = (_state = {}, action: any) => {
    switch (action.type) {
      case type:
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
