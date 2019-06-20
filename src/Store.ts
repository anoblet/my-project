import {
  createStore,
  compose as origCompose,
  applyMiddleware,
  combineReducers,
  Store
} from "redux";
import thunk from "redux-thunk";
import { lazyReducerEnhancer, LazyStore } from "pwa-helpers/lazy-reducer-enhancer.js";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

export interface State {
  app: any;
  router: any;
  settings: any;
  theme: any;
  user: any;
}

// Sets up a Chrome extension for time travel debugging.
const compose = self.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || origCompose;

export const store: Store<State> & LazyStore = createStore(
  (state: any) => state,
  compose(
    lazyReducerEnhancer(combineReducers),
    applyMiddleware(thunk)
  )
);
