import { property } from '@polymer/lit-element';
import { store } from '../../store.js';
import { setState } from './redux/actions/User';

export const StateMixin = function (superClass: any) {
  return class extends superClass {
    // state: any = {};

    getState() {
      return this.state;
    }

    setState(data: any) {
      const state = store.getState();
      store.dispatch(setState({...data}));
    }

    stateChanged(state: any) {
      console.log('Here');
    }
  }
}
