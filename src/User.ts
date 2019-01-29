import { store } from "./Store";
import { setState } from "../packages/state-helpers/state-helpers";

export const isAdmin = () => {
  const state = store.getState();
  return state.user.uid === "m42gwHOSlbUniorNjigqa1nnHIE3";
};

export const resetState = () => {
  setState({ config: { merge: false }, data: {}, store: store, type: "app" });
};

export const signOut = () => {
  return Promise.all([
    import(/* webpackChunkName: "Firebase" */ "firebase/app"), // @ts-ignore
    import(/* webpackChunkName: "FirebaseAuth" */ "firebase/auth")
  ]).then(([firebase, auth]) => {
    firebase.auth().signOut();
  });
};
