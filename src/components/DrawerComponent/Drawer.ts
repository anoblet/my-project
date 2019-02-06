import * as style from "./Drawer.scss";

import { LitElement, customElement } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import { Mixin } from "../../../packages/Mixin";
import { StateMixin } from "../../../packages/StateMixin";
import Style from "./Style";
import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "../../Store";
import template from "./DrawerTemplate";

@customElement("app-drawer")
//@customElement("drawer-component")
export class Drawer extends LitElement {
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
    return [GlobalStyle, Style];
  }

  render() {
    return template.bind(this)();
  }
}
