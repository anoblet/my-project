import "@material/mwc-fab";

import * as style from "./MenuComponent.scss";

import { LitElement, html, property } from "@polymer/lit-element";

import { Mixin } from "../../../packages/Mixin";
import { FirebaseMixin } from "../../../packages/StateMixin";
import { StateMixin } from "../../../packages/StateMixin";
import template from "./MenuTemplate";
import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "../../store.js";
import { until } from "lit-html/directives/until";

export class MenuComponent extends Mixin(connect(store)(LitElement), [
  Firebase,
  StateMixin
]) {
  @property({ type: Boolean, reflect: true }) hidden = true;

  constructor() {
    super();
    this.boundListener = this._onContextMenu.bind(this);
    document.addEventListener("keyup", this._onKeyUp.bind(this));
  }

  firstUpdated() {
    super.firstUpdated();
    this.watchDocument("settings", (document: any) => {
      if (document) {
        this.setState(document, "settings");
      }
    });
    const links = this.shadowRoot.querySelectorAll("a");
    links.forEach((link: any) => {
      link.addEventListener("click", () => {
        this.hidden = true;
      });
    });
  }

  _onContextMenu(e: any) {
    e.preventDefault();
    this.hidden = !this.hidden;
  }

  _onKeyUp(e: any) {
    if (e.shiftKey && e.keyCode == 32) {
      this.hidden = !this.hidden;
    }
  }

  stateChanged(state: any) {
    if (state.settings) {
      if (state.settings.rightClick) {
        document.addEventListener("contextmenu", this.boundListener);
      } else {
        document.removeEventListener("contextmenu", this.boundListener);
      }
    }
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
