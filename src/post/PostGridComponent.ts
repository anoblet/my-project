import * as style from "./PostGridComponent.scss";

import { LitElement, html, property } from "@polymer/lit-element";

import { until } from "lit-html/directives/until";

export class PostGridComponent extends LitElement {
  @property({ type: Array }) items: any;

  deleteItem(index: Number) {
    const items = this.items;
    const item = items.splice(index, 1);
    this.items = [...items];
    this.dispatchEvent(
      new CustomEvent("item-deleted", {
        composed: true,
        detail: item[0]
      })
    );
  }

  render() {
    return html`
      <style>
        ${style}
      </style>
      ${
        until(
          import("./PostGridComponentTemplate.ts").then(module =>
            module.default.bind(this)()
          )
        )
      }
    `;
  }
}

window.customElements.define("post-grid-component", PostGridComponent);
