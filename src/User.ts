import { store } from "./Store";

export const isAdmin = () => {
  const state = store.getState();
  return state.user.uid === "m42gwHOSlbUniorNjigqa1nnHIE3";
}

export class User {
  signOut() {
    return Promise.all([
      import(/* webpackChunkName: "Firebase" */ "firebase/app"),
      // @ts-ignore
      import(/* webpackChunkName: "FirebaseAuth" */ "firebase/auth")
    ]).then(([firebase, auth]) => {
      firebase.auth().signOut();
    });
  }
}
