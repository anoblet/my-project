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

    setState(action: any, data: any) {
      this.store.dispatch({
        type: action,
        state: data
      });
    }

    // setStateAction(state: any) {
    //   return {
    //     type: 'SET_STATE',
    //     state: state
    //   }
    // }

    stateChanged(state: any) {
      console.log('Here');
    }
  }
}
