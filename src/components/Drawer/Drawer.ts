import { html, LitElement, property } from "@polymer/lit-element";
import { connect } from "pwa-helpers/connect-mixin.js";
import { Mixin } from "../../../packages/Mixin";
import { store } from "../../store.js";
import * as style from "./Drawer.scss";
import template from "./DrawerTemplate";

export class Drawer extends LitElement {
  firstUpdated() {
    const nav = this.shadowRoot.querySelector("#nav");
    const links = nav.querySelectorAll("a");
    links.forEach((link: any) =>
      link.addEventListener("click", () => this._closeDrawer())
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
