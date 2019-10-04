import { LitElement, customElement } from "lit-element";

import { store } from "../../Store";
import style from "./Style";
import template from "./Template";

@customElement("header-component")
export class HeaderComponent extends LitElement {
  public static styles = style;
  public render = template.bind(this);

  public firstUpdated() {
    const state = store.getState();
    const user = state.user;
    if (user.signedIn) this.setButtonBackground(user);
  }

  public setButtonBackground(user: any = false) {
    const button: any = this.querySelector("#userProfile");
    if (button)
      if (user.photo) {
        button.style.background = `url('${user.photo}')`;
        button.style.backgroundSize = "contain";
      }
  }
}
