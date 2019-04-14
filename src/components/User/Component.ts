import { LitElement, customElement } from "lit-element";

import Template from "./Template";
import Style from "./Style";
import { config } from "../../../config";
import uiStyle from "./FirebaseUIStyle";

export const getForm = () =>
  Promise.all([
    import(/* webpackChunkName: "Firebase" */ "@firebase/app"),
    import(/* webpackChunkName: "FirebaseUI" */ "firebaseui")
  ]).then(async ([firebase, firebaseui]) => {
    const el = document.createElement("div");
    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      // @ts-ignore
      new firebaseui.auth.AuthUI(firebase.auth());
    ui.start(el, {
      ...config.firebaseui,
      ...{ credentialHelper: firebaseui.auth.CredentialHelper.NONE }
    });
    return el;
  });

@customElement("user-component")
export class UserComponent extends LitElement {
  public async getForm() {
    return getForm();
  }

  static get styles() {
    return [uiStyle, Style];
  }

  public render() {
    return Template.bind(this)();
  }
}
