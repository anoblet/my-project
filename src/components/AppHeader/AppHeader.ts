import { LitElement, html, query } from "lit-element";
import template from "./AppHeaderTemplate";
import(/* webpackChunkName: "MWCFab" */ "@material/mwc-fab");
import * as style from "./AppHeader.scss";

import ComponentStyle from "./Style";

import { getUser } from "../../../packages/firebase-helpers";

export class AppHeader extends LitElement {
  @query("mwc-fab") public fab: any;

  public firstUpdated() {
    getUser({
      callback: (user: any) => {
        if (user) this.setButtonBackground(user);
        else {
          // Is this necessary?
          // this.resetButton();
        }
      }
    });
  }

  public setButtonBackground(user: any = false) {
    const fab = this.querySelector("#userProfile");
    const button = fab.shadowRoot.querySelector("button");
    if (button)
      if (user.photoURL) {
        button.style.background = `url('${user.photoURL}')`;
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
    return [ComponentStyle];
  }

  public render() {
    return html`
      <style>
        ${style}
      </style>
      ${template.bind(this)()}
    `;
  }
}

window.customElements.define("app-header", AppHeader);
