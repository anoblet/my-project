import { LitElement } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";
import { store } from "../../Store";
import template from "./AppHeaderTemplate";

import(/* webpackChunkName: "MWCFab" */ "@material/mwc-fab");

export class AppHeader extends LitElement {
  public firstUpdated() {
    const state = store.getState();
    const user = state.user;
    if (user) this.setButtonBackground(user);
  }

  public setButtonBackground(user: any = false) {
    const fab = this.querySelector("#userProfile");
    const button = fab.shadowRoot.querySelector("button");
    if (button)
      if (user.photo) {
        button.style.background = `url('${user.photo}')`;
        button.style.backgroundSize = "contain";
      }
  }

  public resetButton() {
    const fab = this.querySelector("#userProfile");
    const button = fab.shadowRoot.querySelector("button");
    if (button) {
      button.style.background = `var(--secondary-color)`;
      button.style.backgroundSize = "initial";
    }
  }

  static get styles() {
    return [GlobalStyle, Style];
  }

  public render() {
    return template.bind(this)();
  }
}

window.customElements.define("app-header", AppHeader);
