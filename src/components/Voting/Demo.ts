import "./Component";
import GlobalStyle from "../../GlobalStyle";

import { LitElement, css, customElement, html } from "lit-element";

import { BeforeRender } from "../../mixins/BeforeRender";

@customElement("voting-component-demo")
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
      <voting-component></voting-component>
    `;
  }
}
