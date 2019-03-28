import { LitElement, css, customElement, html } from "lit-element";

import Style from "./Style";
import muuri from "muuri";
import template from "./template";

@customElement("muuri-component")
export class Muuri extends LitElement {
  public grid: any;

  public connectedCallback() {
    super.connectedCallback();
  }

  public firstUpdated() {
    this.grid = new muuri(this.shadowRoot.querySelector(".grid"), {
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

  public reset() {
    this.grid.refreshItems().layout();
  }
}
