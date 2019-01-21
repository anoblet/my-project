import {
  createStore,
  compose as origCompose,
  applyMiddleware,
  combineReducers
} from "redux";
import thunk from "redux-thunk";
import { lazyReducerEnhancer } from "pwa-helpers/lazy-reducer-enhancer.js";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

// Sets up a Chrome extension for time travel debugging.
// See https://github.com/zalmoxisus/redux-devtools-extension for more information.
const compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || origCompose;
export const store = createStore(
  (state: any) => state,
  compose(
    lazyReducerEnhancer(combineReducers),
    applyMiddleware(thunk)
  )
);

// export const store = createStore(
//   state => state as Reducer<RootState, RootAction>,
//   devCompose(
//     lazyReducerEnhancer(combineReducers),
//     applyMiddleware(thunk as ThunkMiddleware<RootState, RootAction>))
// );
