import { html, property } from "lit-element";

type Constructor<T = {}> = new (...args: any[]) => T;

export function StateMixin<B extends Constructor<HTMLElement>>(baseClass: B) {
  class MixinClass extends baseClass {
    store: any;
    state: any;
    requestUpdate: any;

    addReducer(type: any, customFunction: any = false) {
      const defaultFunction = (state = {}, action: any) => {
        switch (action.type) {
          case `${type}`:
            return action.merge
              ? {
                  ...state,
                  ...action.state
                }
              : action.state;
          default:
            return state;
        }
      };
      this.store.addReducers({
        [type]: customFunction ? customFunction : defaultFunction
      });
    }

    addReducerNew({ customFunction, path, type }: any) {
      const defaultFunction = (state = {}, action: any) => {
        switch (action.type) {
          case `${type}`:
            return action.merge
              ? {
                  ...state,
                  ...action.state
                }
              : action.state;
          default:
            return state;
        }
      };
      this.store.addReducers({
        [type]: customFunction ? customFunction : defaultFunction
      });
    }

    setState(data: any, type: any, config: any = { merge: true }) {
      this.store.dispatch({
        type: type,
        state: data,
        merge: config.merge
      });
    }

    setStateNew({ data, type, config }: any) {
      this.store.dispatch({
        type: type,
        state: data,
        merge: config.merge
      });
    }

    setStore(store: any) {
      this.store = store;
      return this;
    }

    stateChanged(state: any) {
      this.state = state;
      this.requestUpdate();
    }
  }

  return MixinClass;
}
