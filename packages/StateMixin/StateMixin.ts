export const StateMixin = function(superClass: any) {
  return class extends superClass {
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

    setState(data: any, type: any, config: any = { merge: true }) {
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
  };
};
