import * as style from "./PostGridComponent.scss";
import { css, LitElement, html, property } from "lit-element";
import { until } from "lit-html/directives/until";
import template from "./PostGridComponentTemplate";

export class PostGridComponent extends LitElement {
  @property({ type: Array }) items: any;

  static get styles() {
    return [
      css`
        card-component {
          max-width: 100%;
        }
      `
    ];
  }

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
      ${template.bind(this)()}
    `;
  }
}

window.customElements.define("post-grid-component", PostGridComponent);
