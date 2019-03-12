import { LitElement, customElement, html } from "lit-element";

import { BeforeRender } from "../../mixins/BeforeRender";

@customElement("philips-hue-demo")
export class Demo extends BeforeRender(LitElement) {
  render() {
    return html``;
  }
}
