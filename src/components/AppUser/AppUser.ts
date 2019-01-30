import { LitElement, html, property } from "lit-element";

import template from "./AppUserTemplate";
import { config } from "../../../config";
import uiStyle from "./FirebaseUIStyle";

export const getForm = () =>
    Promise.all([
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

export class AppUser extends LitElement {
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

  static get styles() {
    return [uiStyle];
  }

  render() {
    return template.bind(this)();
  }
}

window.customElements.define("app-user", AppUser);
