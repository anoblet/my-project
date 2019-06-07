import { LitElement, customElement, property, html } from "lit-element";

import Style from "./Style";
import Template from "./Template";

/**
 * Almanac class
 * Position could be defined with an x,y value indicating category, topic
 * @todo lazy-load documents one degree in any direction, re-run after position change
 */
@customElement("component-almanac")
export class Almanac extends LitElement {
  public static styles = Style;
  public render = Template.bind(this);

  public async loadDocument() {}

  public up() {
    return html`
      Up
    `;
  }

  public right() {
    return html`
      Right
    `;
  }

  public down() {
    return html`
      Down
    `;
  }

  public left() {
    return html`
      Left
    `;
  }
}
