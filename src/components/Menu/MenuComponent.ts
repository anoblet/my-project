import "@material/mwc-fab";

import * as style from "./MenuComponent.scss";

import { LitElement, html, property } from "@polymer/lit-element";

import { BaseMixin } from "../../../packages/BaseMixin";
import { Mixin } from "../../../packages/Mixin";
import Template from "./MenuTemplate";
import { until } from "lit-html/directives/until";

export class MenuComponent extends Mixin(LitElement, [BaseMixin]) {
  @property({ type: Boolean, reflect: true }) hidden = false;

  constructor() {
    super();
    this._boundOnKeyUp = this._onKeyUp.bind(this);
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    document.onkeyup = () => this._onKeyUp();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // window.removeEventListener("hashchange", this._boundListener);
  }

  _onKeyUp() {
    console.log("Hi");
  }

  public render() {
    return html`
      <style>
        ${style}
      </style>
      ${
        until(
          import("./MenuTemplate.ts").then(module =>
            module.default.bind(this)()
          )
        )
      }
    `;
  }
}

window.customElements.define("menu-component", MenuComponent);
