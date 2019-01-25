import { LitElement, css, html, customElement, property } from "lit-element";
import * as style from "./Card.scss";
import template from "./CardTemplate";

@customElement("card-component")
export class CardComponent extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          padding: var(--padding, 1em);
        }
      `
    ];
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
