import { store } from '../../src/store.js';

export const StateMixin = function (superClass: any) {
  return class extends superClass {
    connectedCallback() {
      super.connectedCallback();
      this.setStore(store);
    }

    addType(type: any) {
      const reducer = (state = {}, action: any) => {
        switch (action.type) {
          case `${type}`:
            return {
              ...state, ...action.state};
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
    }

    setState(data: any, action: any) {
      this.store.dispatch({
        type: action,
        state: data
      });
    }

    stateChanged(state: any) {
      this.state = state;
    }
  }
}
