import { store } from '../../store.js';
import { setState } from './actions/User';

export const StateMixin = function (superClass: any) {
  return class extends superClass {
    state: any = {};

    getState() {
      return this.state;
    }

    setState(data: any) {
      const state = store.getState();
        store.dispatch(setState({...state, data}));
    }

    stateChanged(state: any) {
      this.state = state;
    }
  }
}
