import "./Component";
import GlobalStyle from "../../GlobalStyle";

import { LitElement, css, customElement, html } from "lit-element";

import { BeforeRender } from "../../mixins/BeforeRender";

@customElement("component-clap-demo")
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
      <component-clap></component-clap>
    `;
  }
}
