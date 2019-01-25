import { html } from "lit-element";
import { navigate } from "lit-redux-router";
import { AppUser } from "../AppUser/AppUser";


export default () => {
  Promise.all([
    import(/* webpackChunkName: "FirebaseApp" */ "firebase/app"),
    import(/* webpackChunkName: "firebaseAuth" */ "firebase/auth")
  ]).then(([firebase]) => {
    firebase.auth().signOut();
  });
};
