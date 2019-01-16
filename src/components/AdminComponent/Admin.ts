import { css, html, LitElement, customElement, property } from "lit-element";
import template from "./AdminTemplate";
import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "../../store";
import { Mixin } from "../../../packages/Mixin";
import { StateMixin } from "../../../packages/StateMixin";

@customElement("admin-component")
export class AdminComponent extends Mixin(connect(store)(LitElement), [
  StateMixin
]) {
  static get styles() {
    return [
      css`
        :host: {
        }
      `
    ];
  }
  render() {
    return html`
      ${template.bind(this)(this.state)}
    `;
  }
}
