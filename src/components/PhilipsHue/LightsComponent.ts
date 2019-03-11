import { customElement, html, LitElement, property } from "lit-element";
import { getLights } from "./PhilipsHue";
import { BeforeRender } from "../../mixins/BeforeRender";

import("./LightComponent");

@customElement("lights-component")
export class Lights extends BeforeRender(LitElement) {
  @property() lights: any;

  constructor() {
    super();
  }

  async beforeRender() {
    const lights = await getLights({
      ip: "192.168.43.221",
      user: "mWHCs99pkPAniHe0lsSG8ES7qG1xDF8qDQw0h0dN",
      id: 4
    });
    const keys = Object.keys(lights);
    const lightArray: any = [];
    keys.map((key: any) => {
      lightArray.push({ lightId: key, ...lights[key] });
    });
    this.lights = lightArray;
    console.log(lightArray);
  }

  render() {
    return html`
      ${this.lights.map((light: any) => {
        console.log(light.lightId);
        return html`
          <light-component .lightId=${light.lightId}></light-component>
        `;
      })}
    `;
  }
}
