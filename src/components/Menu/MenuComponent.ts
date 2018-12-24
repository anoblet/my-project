import "@material/mwc-fab";

import * as style from "./MenuComponent.scss";

import { LitElement, html } from "@polymer/lit-element";

import { BaseMixin } from "../../../packages/BaseMixin";
import { Mixin } from "../../../packages/Mixin";
import Template from "./MenuTemplate";
import { until } from "lit-html/directives/until";

export class MenuComponent extends Mixin(LitElement, [BaseMixin]) {
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
