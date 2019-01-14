import { html, LitElement, customElement, property } from "lit-element";
import * as style from "./Card.scss";
import template from "./CardTemplate";

@customElement("card-component")
export class CardComponent extends LitElement {
  render() {
    return html`
      <style>
        ${style}
      </style>
      ${template.bind(this)()}
    `;
  }
}
