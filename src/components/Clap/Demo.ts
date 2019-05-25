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
        flex: 1;
        contain: initial;
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
