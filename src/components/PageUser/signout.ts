import { html } from "lit-element";
import { navigate } from "lit-redux-router";
import { AppUser } from "../AppUser/AppUser";

const firebase = window.firebase;
const firebaseui = window.firebaseui;

export default function() {
  // const user = new AppUser();
  // user.signout();
  // this.store.dispatch(navigate("/"));
  // Promise.all([
  //   import(/* webpackChunkName: "FirebaseApp" */ "firebase/app")
  //   // import(/* webpackChunkName: "firebaseAuth" */ 'firebase/auth')
  // ]).then(([firebase]) => {
  firebase.auth().signOut();
  // });
}
