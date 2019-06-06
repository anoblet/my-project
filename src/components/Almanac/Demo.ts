import "./Component";

import { LitElement, css, customElement, html } from "lit-element";

@customElement("clock-demo")
export class Demo extends LitElement {
  public static styles = [css``];

  public render() {
    return html`
      <component-almanac></component-almanac>
    `;
  }
}
