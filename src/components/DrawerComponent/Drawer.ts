import { customElement, html, LitElement, property } from "lit-element";
import { connect } from "pwa-helpers/connect-mixin.js";
import { Mixin } from "../../../packages/Mixin";
import { StateMixin } from "../../../packages/StateMixin";
import { store } from "../../store";
import * as style from "./Drawer.scss";
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

  render() {
    return html`
      <style>
        ${style}
      </style>
      ${template.bind(this)()}
    `;
  }
}

window.customElements.define("app-drawer", Drawer);
