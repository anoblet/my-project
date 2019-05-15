import "../voting/Component";
import GlobalStyle from "../../GlobalStyle";

import { LitElement, css, customElement, html, property } from "lit-element";

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
      <card-component><voting-component></voting-component></card-component>
    `;
  }

  public handleChange(e: any) {
    this[e.target.name] = e.target.value;
  }
}
