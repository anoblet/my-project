import "@material/mwc-fab";

import * as style from "./MenuComponent.scss";

import { LitElement, html, property } from "lit-element";

import { Mixin } from "../../../packages/Mixin";
import { FirebaseMixin } from "../../../packages/FirebaseMixin";
import { StateMixin } from "../../../packages/StateMixin";
import template from "./MenuTemplate";
import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "../../Store";
import { until } from "lit-html/directives/until";
import GlobalStyle from "../../GlobalStyle";

export class MenuComponent extends Mixin(connect(store)(LitElement), [
  FirebaseMixin,
  StateMixin
]) {
  @property({ type: Boolean, reflect: true }) public hidden = true;

  constructor() {
    super();
    this.boundListener = this._onContextMenu.bind(this);
    document.addEventListener("keyup", this._onKeyUp.bind(this));
  }

  public firstUpdated() {
    super.firstUpdated();

    const links = this.shadowRoot.querySelectorAll("a");
    links.forEach((link: any) => {
      link.addEventListener("click", () => {
        this.hidden = true;
      });
    });
  }

  public _onContextMenu(e: any) {
    e.preventDefault();
    this.hidden = !this.hidden;
  }

  public _onKeyUp(e: any) {
    if (e.shiftKey && e.keyCode == 32) {
      this.hidden = !this.hidden;
    }
  }

  public stateChanged(state: any) {
    if (state.settings) {
      if (state.settings.rightClick) {
        document.addEventListener("contextmenu", this.boundListener);
      } else {
        document.removeEventListener("contextmenu", this.boundListener);
      }
    }
  }

  static get styles() {
    return GlobalStyle;
  }

  public render() {
    return html`
      <style>
        ${style}
      </style>
      ${template()}
    `;
  }
}

window.customElements.define("menu-component", MenuComponent);
