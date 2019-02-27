import { html, LitElement, customElement } from "lit-element";
import * as style from "./Grid.scss";
import template from "./GridTemplate";

@customElement("grid-component")
export class GridComponent extends LitElement {
  public render() {
    return html`
      <style>
        ${style}
      </style>
      ${template.bind(this)()}
    `;
  }
}
