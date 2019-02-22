import { html, LitElement, property } from "lit-element";

import * as style from "./GridItem.scss";

export class GridItem extends LitElement {
  @property({ type: Boolean, reflect: true }) public center: boolean;
  @property({ type: Number }) public span: number;

  public connectedCallback() {
    super.connectedCallback();
    if (this.span) this.style.gridColumn = `span ${this.span}`;
  }

  public render() {
    return html`
      <style>
        ${style}</style
      ><slot></slot>
    `;
  }
}

window.customElements.define("grid-item", GridItem);
