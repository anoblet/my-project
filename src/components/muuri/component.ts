import { LitElement, css, customElement, html } from "lit-element";

import Style from "./Style";
import muuri from "muuri";
import template from "./template";

@customElement("muuri-component")
export class Muuri extends LitElement {
  grid: any;

  connectedCallback() {
    super.connectedCallback();
  }

  firstUpdated() {
    var grid = new muuri(this.shadowRoot.querySelector(".grid"), {
      dragEnabled: true,
      layout: {
        fillGaps: true
      }
    });
  }

  static get styles() {
    return Style;
  }

  public render() {
    return template.bind(this)();
  }

  reset() {
    this.grid.refreshItems().layout();
  }
}
