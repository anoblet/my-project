import { html, LitElement, property } from "lit-element";
import { connect } from "pwa-helpers/connect-mixin.js";
import { config } from "../../../config";
import { BaseMixin } from "../../../packages/BaseMixin";
import { Mixin } from "../../../packages/Mixin";
import { StateMixin } from "../../../packages/StateMixin";
import { TaskMixin } from "../../../packages/TaskMixin";
import { store } from "../../store";

import Template from "./AppUserTemplate";

const firebase = window.firebase;
const firebaseui = window.firebaseui;

export class AppUser extends Mixin(connect(store)(LitElement), [
  BaseMixin,
  TaskMixin,
  StateMixin
]) {
  @property({ type: Boolean }) isSignedIn = false;
  @property({ type: Object }) form: any;

  constructor() {
    super();
    this.setStore(store);
  }

  connectedCallback() {
    super.connectedCallback();
    // this.runTasks([this.registerAuthStateChanged()]);
  }

  registerAuthStateChanged() {
    // Promise.all([
    //   import(/* webpackChunkName: "FirebaseApp" */ "firebase/app"),
    //   import(/* webpackChunkName: "FirebaseAuth" */ "firebase/auth")
    // ]).then(([firebase]) => {
    //   firebase.auth().onAuthStateChanged((user: any) => {
    //     this.authStateChanged(user);
    //   });
    // });
  }

  signedIn(user: any) {
    return user ? true : false;
  }

  authStateChanged(user: any) {
    const userModel: any = {};
    const signedIn = user ? true : false;
    userModel.signedIn = signedIn;
    if (signedIn) {
      userModel.name = user.displayName;
      userModel.email = user.email;
      userModel.photo = this.getPhotoUrl(user);
    }
    this.setState(userModel, "user");
  }

  getPhotoUrl(user: any) {
    return user.photoURL;
  }

  _resetSettings() {
    this.setState(
      {
        backgroundColor: "#ffffff",
        borderColor: "#000000",
        primaryColor: "#000000",
        secondaryColor: "#000000",
        textColor: "#000000"
      },
      "theme"
    );
  }

  _signoutHandler() {
    this.signout();
  }

  signout() {
    // Promise.all([
    //   import(/* webpackChunkName: "FirebaseApp" */ "firebase/app")
    //   // import(/* webpackChunkName: "firebaseAuth" */ 'firebase/auth')
    // ]).then(([firebase]) => {
    firebase.auth().signOut();
    this.setState({}, "user", { merge: false });
    this.runTasks([this._resetSettings()]);
    // });
  }

  createForm(el: any) {
    // const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
    // ui.start(el, {...config.firebaseui, ...{'credentialHelper': firebaseui.auth.CredentialHelper.NONE}});
    // return el;
  }

  getForm() {
    return new Promise((resolve, reject) => {
      // Promise.all([
      //   import(/* webpackChunkName: "FirebaseApp" */ "firebase/app"),
      //   import(/* webpackChunkName: "FirebaseUI" */ "firebaseui")
      // ]).then(async () => {
      const el = document.createElement("div");
      const ui =
        firebaseui.auth.AuthUI.getInstance() ||
        new firebaseui.auth.AuthUI(firebase.auth());
      ui.start(el, {
        ...config.firebaseui,
        ...{ credentialHelper: firebaseui.auth.CredentialHelper.NONE }
      });
      resolve(el);
    });
    // });
  }

  stateChanged(state: any) {
    this.state = state;
  }

  render() {
    return Template.bind(this)(this.state);
  }
}

window.customElements.define("app-user", AppUser);
