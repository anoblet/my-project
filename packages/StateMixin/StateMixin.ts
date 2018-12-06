import { store } from '../../src/store.js';

export const StateMixin = function (superClass: any) {
  return class extends superClass {
    connectedCallback() {
      super.connectedCallback();
      this.setStore(store);
    }

    addReducer(type: any, customFunction: any = false) {
      const defaultFunction = (state = {}, action: any) => {
        switch (action.type) {
          case `${type}`:
            return action.merge ? {
              ...state, ...action.state
            } : action.state
          default:
            return state;
        }
      };
      this.store.addReducers({
        [type]: customFunction ? customFunction : defaultFunction
      });
    }

    addType(type: any, customFunction: any = false) {
      const reducer = (state = {}, action: any) => {
        switch (action.type) {
          case `${type}`:
            return action.merge ? {
              ...state, ...action.state
            } : action.state
          default:
            return state;
        }
      };
      this.store.addReducers({
        [type]: reducer
      });
    }

    setStore(store: any) {
      this.store = store;
      return this;
    }

    setState(data: any, type: any, config: any = {merge: true}) {
      this.store.dispatch({
        type: type,
        state: data,
        merge: config.merge
      });
    }

    stateChanged(state: any) {
      this.state = state;
      this.requestUpdate();
    }
  }
}
