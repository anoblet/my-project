import { LitElement, customElement, html, property } from "lit-element";
import { isOn, turnOff, turnOn } from "./PhilipsHue";
@customElement("light-component")
export class Light extends LitElement {
  @property() on: boolean;

  constructor() {
    super();
    this.beforeRender();
  }

  async beforeRender() {
    this.on = await isOn({
      ip: "192.168.43.221",
      user: "mWHCs99pkPAniHe0lsSG8ES7qG1xDF8qDQw0h0dN",
      id: 4
    });
  }

  async refreshState() {
    this.on = await isOn({
      ip: "192.168.43.221",
      user: "mWHCs99pkPAniHe0lsSG8ES7qG1xDF8qDQw0h0dN",
      id: 4
    });
  }

  async turnOn() {
    await turnOn({
      ip: "192.168.43.221",
      user: "mWHCs99pkPAniHe0lsSG8ES7qG1xDF8qDQw0h0dN",
      id: 4
    });
    this.refreshState();
  }

  async turnOff() {
    await turnOff({
      ip: "192.168.43.221",
      user: "mWHCs99pkPAniHe0lsSG8ES7qG1xDF8qDQw0h0dN",
      id: 4
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
