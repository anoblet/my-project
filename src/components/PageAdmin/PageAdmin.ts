import { css, html, LitElement } from "lit-element";
import * as style from "./PageAdmin.scss";
import Template from "./PageAdminTemplate";
import { getTheme } from "../../theme-provider";
import { Mixin } from "../../../packages/Mixin";
import { StateMixin } from "../../../packages/StateMixin";
import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "../../store";
import { updateDocument } from "../../../packages/firebase-helpers";

import("../CardComponent/CardComponent");
import("../GridComponent/GridComponent");

export class PageAdmin extends Mixin(connect(store)(LitElement), [StateMixin]) {
  static get styles() {
    const theme = getTheme();
    return [
      css`
        :host: {
          background-color: ${theme.backgroundColor};
          color: ${theme.textColor};
        }
      `
    ];
  }

  constructor() {
    super();
    this.setStore(store);
  }

  stateChanged(state: any) {
    super.stateChanged();
    this.state = state;
    if (state.app.mode) {
      const path = `users/${state.user.uid}/settings/default`;
      const data = { mode: state.app.mode };
      updateDocument({ path, data });
    }
  }

  public render() {
    return html`
      <style>
        ${style}
      </style>
      ${Template.bind(this)(this.state)}
    `;
  }
}

window.customElements.define("page-admin", PageAdmin);
