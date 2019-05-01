import "./Component";

import { LitElement, css, customElement, html } from "lit-element";

@customElement("clock-demo")
export class Demo extends LitElement {
  public static styles = [
    css`
      :host {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
    `
  ];

  public render() {
    return html``;
  }
}
