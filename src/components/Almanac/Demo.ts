import "./Component";

import { LitElement, css, customElement, html } from "lit-element";

@customElement("component-almanac-demo")
export class Demo extends LitElement {
  public render() {
    return html`
      <component-almanac></component-almanac>
    `;
  }
}
