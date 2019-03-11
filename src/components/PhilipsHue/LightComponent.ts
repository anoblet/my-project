import { LitElement, customElement, html, property } from "lit-element";
import { isOn, turnOff, turnOn } from "./PhilipsHue";

import { BeforeRender } from "../../mixins/BeforeRender";

@customElement("light-component")
export class Light extends BeforeRender(LitElement) {
  @property() on: boolean;
  @property() lightId: any;

  async beforeRender() {
    if (this.lightId) await this.refreshState();
  }

  async refreshState() {
    this.on = await isOn({
      ip: "192.168.43.221",
      user: "mWHCs99pkPAniHe0lsSG8ES7qG1xDF8qDQw0h0dN",
      id: this.lightId
    });
  }

  async turnOn() {
    await turnOn({
      ip: "192.168.43.221",
      user: "mWHCs99pkPAniHe0lsSG8ES7qG1xDF8qDQw0h0dN",
      id: this.lightId
    });
    this.refreshState();
  }

  async turnOff() {
    await turnOff({
      ip: "192.168.43.221",
      user: "mWHCs99pkPAniHe0lsSG8ES7qG1xDF8qDQw0h0dN",
      id: this.lightId
    });
    this.refreshState();
  }

  render() {
    return html`
      ${this.on} <button @click=${this.turnOn}>Turn on</button
      ><button @click=${this.turnOff}>Turn off</button>
    `;
  }
}
