import { LitElement, html, query } from "lit-element";
import template from "./AppHeaderTemplate";
import(/* webpackChunkName: "MWCFab" */ "@material/mwc-fab");
import * as style from "./AppHeader.scss";

import ComponentStyle from "./Style.ts";

import { getUser } from "../../../packages/firebase-helpers";

export class AppHeader extends LitElement {
  @query("mwc-fab") fab: any;

  firstUpdated() {
    getUser({
      callback: (user: any) => {
        if (user) this.setButtonBackground(user);
        else {
          // Is this necessary?
          this.resetButton();
        }
      }
    });
  }

  setButtonBackground(user: any) {
    const fab = this.querySelector("mwc-fab");
    const button = fab.shadowRoot.querySelector("button");
    if (button) {
      if (user.photoURL) {
        button.style.background = `url('${user.photoURL}')`;
        button.style.backgroundSize = "contain";
      }
    }
  }

  resetButton() {
    const fab = this.querySelector("mwc-fab");
    const button = fab.shadowRoot.querySelector("button");
    if (button) {
      button.style.background = `var(--secondary-color)`;
      button.style.backgroundSize = "initial";
    }
  }

  static get styles() {
    return [ComponentStyle];
  }

  render() {
    return html`
      <style>
        ${style}
      </style>
      ${template.bind(this)()}
    `;
  }
}

window.customElements.define("app-header", AppHeader);
