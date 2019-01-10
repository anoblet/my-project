import { html, LitElement, property } from "@polymer/lit-element";
import { connect } from "pwa-helpers/connect-mixin.js";
import { Mixin } from "../../../packages/Mixin";
import { store } from "../../store.js";
import * as style from "./ProfileMenu.scss";
import template from "./ProfileMenuTemplate";
import { StateMixin } from "../../../packages/StateMixin";

export class ProfileMenu extends Mixin(connect(store)(LitElement), [
  StateMixin
]) {
  @property({ type: Boolean, reflect: true, attribute: "hidden" })
  hidden: boolean = true;
  firstUpdated() {
    // Close ProfileMenu on link click
    const links = this.shadowRoot.querySelectorAll("a");
    links.forEach((link: any) =>
      link.addEventListener("click", this._closeProfileMenu.bind(this))
    );
  }

  // Handlers
  _closeProfileMenu() {
    this.hidden = true;
  }

  render() {
    return html`
      <style>
        ${style}
      </style>
      ${template.bind(this)(this.state)}
    `;
  }
}

window.customElements.define("profile-menu", ProfileMenu);
