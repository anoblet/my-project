import "./Component";
import GlobalStyle from "../../GlobalStyle";

import { LitElement, css, customElement, html } from "lit-element";

import { BeforeRender } from "../../mixins/BeforeRender";

@customElement("clap-component-demo")
export class Demo extends BeforeRender(LitElement) {
  public static styles = [
    GlobalStyle,
    css`
      :host {
      }
    `
  ];

  public async beforeRender() {
    return;
  }

  public render() {
    return html`
      <clap-component></clap-component>
    `;
  }
}
