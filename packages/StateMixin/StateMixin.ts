import { store } from '../../src/store.js';

export const StateMixin = function (superClass: any) {
  return class extends superClass {
    connectedCallback() {
      super.connectedCallback();
      this.setStore(store);
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
      console.log('Here');
    }
  }
}
