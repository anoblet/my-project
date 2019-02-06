import * as style from "./Drawer.scss";

import { LitElement, css, customElement, html } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import { Mixin } from "../../../packages/Mixin";
import { StateMixin } from "../../../packages/StateMixin";
import Style from "./Style";
import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "../../Store";
import template from "./DrawerTemplate";

// @customElement("drawer-component")
export class Drawer extends Mixin(connect(store)(LitElement), [StateMixin]) {
  firstUpdated() {
    // Close drawer on link click
    const links = this.shadowRoot.querySelectorAll("a");
    links.forEach((link: any) =>
      link.addEventListener("click", this._closeDrawer)
    );
  }

  // Handlers
  _closeDrawer() {
    this.dispatchEvent(
      new CustomEvent("close-drawer", {
        composed: true
      })
    );
  }

  static get styles() {
    return [GlobalStyle, css``];
  }

  render() {
    return template.bind(this)();
  }
}

window.customElements.define("app-drawer", Drawer);
