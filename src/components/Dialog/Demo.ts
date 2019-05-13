import "./Component";

import { LitElement, css, customElement, html } from "lit-element";

import { BeforeRender } from "../../mixins/BeforeRender";
import GlobalStyle from "../../GlobalStyle";

@customElement("dialog-component-demo")
export class Demo extends BeforeRender(LitElement) {
  public static styles = [
    GlobalStyle,
    css`
      :host {
        flex: 1;
      }
    `
  ];

  public async beforeRender() {
    return;
  }

  public render() {
    return html`
      <card-component><dialog-component></dialog-component></card-component>
    `;
  }
}
