import { LitElement, customElement, html, property } from "lit-element";
import { isOn } from "./PhilipsHue";
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
      id: 2
    });
  }

  render() {
    return html`
      ${this.on}
    `;
  }
}
