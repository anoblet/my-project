import { LitElement, css, customElement, html } from "lit-element";
import { until } from "lit-html/directives/until";

import { BeforeRender } from "../../mixins/BeforeRender";
import { bridge } from "./Bridge";

import("./Auth");

@customElement("philips-hue-demo")
export class Demo extends BeforeRender(LitElement) {
  static get styles() {
    return css`
      :host {
        --border-size: 1px;
      }
    `;
  }

  render() {
    return html`
      <grid-component>
        <card-component>Bridge IP: ${until(bridge.ip())}</card-component>
        <card-component
          ><philips-hue-auth ip=${until(bridge.ip())}></philips-hue-auth
        ></card-component>
      </grid-component>
    `;
  }
}