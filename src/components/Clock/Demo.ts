import "./Component";

import { LitElement, css, customElement, html } from "lit-element";

import { absolute } from "../../GlobalStyle";

@customElement("clock-demo")
export class Demo extends LitElement {
  public static styles = [
    css`
      :host {
        display: flex;
        flex: 1;
        ${absolute}
      }
    `
  ];

  public render() {
    return html`
      <clock-component></clock-component>
    `;
  }
}
