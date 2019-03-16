import { LitElement, css, customElement, html } from "lit-element";
import muuri from "muuri";

@customElement("muuri-component")
export class Muuri extends LitElement {
  grid: any;

  connectedCallback() {
    super.connectedCallback();
    this.grid = new muuri(this, {
      dragEnabled: true,
      layout: {
        fillGaps: true
      }
    });
  }

  public static get styles() {
    return css``;
  }

  public render() {
    return html``;
  }

  reset() {
    this.grid.refreshItems().layout();
  }
}
