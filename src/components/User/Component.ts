import { LitElement, customElement } from "lit-element";

import Template from "./Template";
import Style from "./Style";
import { config } from "../../../config";
import FirebaseUIStyle from "./FirebaseUIStyle";

@customElement("user-component")
export class UserComponent extends LitElement {
  public static styles = [FirebaseUIStyle, Style];
  public template = Template;
  public render = this.template.bind(this);
}

export const getForm = async () =>
  Promise.all([
    import(/* webpackChunkName: "Firebase" */ "firebase/app"),
    import(/* webpackChunkName: "Firebase" */ "firebaseui")
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
