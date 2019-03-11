import { customElement, html, LitElement, property } from "lit-element";
import { getLights } from "./PhilipsHue";

@customElement("lights-component")
export class Lights extends LitElement {
  @property() lights: any;

  constructor() {
    super();
    this.beforeRender();
  }

  async beforeRender() {
    const lights = await getLights({
      ip: "192.168.43.221",
      user: "mWHCs99pkPAniHe0lsSG8ES7qG1xDF8qDQw0h0dN",
      id: 4
    });
  }

  render() {
    return html`
    `;
  }
}
