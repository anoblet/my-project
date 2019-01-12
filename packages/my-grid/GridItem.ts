import { html, LitElement, property } from "lit-element";

import * as style from "./GridItem.scss";

export class GridItem extends LitElement {
  @property({ type: Boolean, reflect: true }) center: boolean;
  @property({ type: Number }) span: number;

  connectedCallback() {
    super.connectedCallback();
    if (this.span) this.style.gridColumn = `span ${this.span}`;
  }

  render() {
    return html`
      <style>
        ${style}</style
      ><slot></slot>
    `;
  }
}

window.customElements.define("grid-item", GridItem);
