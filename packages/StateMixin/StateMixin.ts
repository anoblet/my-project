import { store } from '../../src/store.js';

export const StateMixin = function (superClass: any) {
  return class extends superClass {
    connectedCallback() {
      super.connectedCallback();
      this.setStore(store);
    }

    getState() {
      return this.state;
    }

    setStore(store: any) {
      this.store = store;
    }

    setState(data: any) {
      this.store.dispatch(this.setStateAction({...data}));
    }

    setStateAction(state: any) {
      return {
        type: 'SET_STATE',
        state: state
      }
    }

    stateChanged(state: any) {
      console.log('Here');
    }
  }
}
