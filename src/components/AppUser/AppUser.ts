import { LitElement, css } from "lit-element";

import template from "./AppUserTemplate";
import { config } from "../../../config";
import uiStyle from "./FirebaseUIStyle";

export const getForm = () =>
  Promise.all([
    import(/* webpackChunkName: "Firebase" */ "firebase/app"),
    import(/* webpackChunkName: "Firebase" */ "firebaseui")
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
  public getForm() {
    return Promise.all([
      import(/* webpackChunkName: "Firebase" */ "firebase/app"),
      import(/* webpackChunkName: "Firebase" */ "firebaseui")
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
    return [
      uiStyle,
      css`
        :host {
          display: flex;
          flex: 1;
        }

        .firebaseui-container {
          background: none !important;
        }

        .mdl-shadow--2dp {
          box-shadow: none;
        }

        .firebaseui-info-bar {
          margin-top: 20px;
        }

        div.mdl-progress::after {
          display: block;
          color: var(--text-color);
          content: "Authenticating";
          margin: 20px auto;
          text-align: center;
        }

        .mdl-progress {
          height: 5px;
        }
      `
    ];
  }

  public render() {
    return template.bind(this)();
  }
}

window.customElements.define("app-user", AppUser);
