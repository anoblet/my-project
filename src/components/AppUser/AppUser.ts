import { LitElement, html, property } from "lit-element";

import { BaseMixin } from "../../../packages/BaseMixin";
import { Mixin } from "../../../packages/Mixin";
import { StateMixin } from "../../../packages/StateMixin";
import { TaskMixin } from "../../../packages/TaskMixin";
import Template from "./AppUserTemplate";
import { config } from "../../../config";
import { connect } from "pwa-helpers/connect-mixin.js";
import { initApp } from "../../../packages/firebase-helpers";
import { store } from "../../Store";
import uiStyle from "./FirebaseUIStyle";
import { signOut } from "../../User";

export class AppUser extends Mixin(connect(store)(LitElement), [
  TaskMixin,
  StateMixin
]) {
  @property({ type: Boolean }) isSignedIn = false;
  @property({ type: Object }) form: any;

  constructor() {
    super();
    this.setStore(store);
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

  getForm() {
    return Promise.all([
      import(/* webpackChunkName: "FirebaseApp" */ "firebase/app"),
      import(/* webpackChunkName: "FirebaseUI" */ "firebaseui")
    ]).then(async ([firebase, firebaseui]) => {
      const el = document.createElement("div");
      const ui =
        firebaseui.auth.AuthUI.getInstance() ||
        new firebaseui.auth.AuthUI(firebase.auth());
      ui.start(el, {
        ...config.firebaseui,
        ...{ credentialHelper: firebaseui.auth.CredentialHelper.NONE }
      });
      return el;
    });
  }

  stateChanged(state: any) {
    this.state = state;
  }

  static get styles() {
    return [uiStyle];
  }

  render() {
    return Template.bind(this)(this.state);
  }
}

window.customElements.define("app-user", AppUser);
