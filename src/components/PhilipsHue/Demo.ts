import { LitElement, customElement, html } from "lit-element";
import { until } from "lit-html/directives/until";

import { BeforeRender } from "../../mixins/BeforeRender";
import { bridge } from "./Bridge";

@customElement("philips-hue-demo")
export class Demo extends BeforeRender(LitElement) {
  render() {
    return html`
      <card-component>${until(bridge.ip())}</card-component>
    `;
  }
}
