import { customElement, html, LitElement, property } from "lit-element";
import { getLights } from "./PhilipsHue";
import { BeforeRender } from "../../mixins/BeforeRender";

import("./LightComponent");

@customElement("lights-component")
export class Lights extends BeforeRender(LitElement) {
  @property() public lights: any;

  constructor() {
    super();
    alert(
      "This component will break on remote hosts unless you allow unsecure scripts. Otherwise it should find/use a hub on your local network."
    );
  }

  public async beforeRender() {
    const lights = await getLights({
      ip: "192.168.43.221",
      user: "mWHCs99pkPAniHe0lsSG8ES7qG1xDF8qDQw0h0dN",
      id: 4
    });
    const keys = Object.keys(lights);
    const lightArray: any = [];
    keys.map((key: any) => {
      lightArray.push({ id: key, ...lights[key] });
    });
    this.lights = lightArray;
  }

  public render() {
    return html`
      <grid-component>
        <card-component
          >This will enumerate lights on a hub. If accessed from a remote
          client, the request will fail unless you allow scripts from unknown
          sources. I'm not asking you to allow those scripts, it's just a
          requirement unless you are on the same network as the
          hub.</card-component
        >
        ${this.lights.map((light: any) => {
          return html`
            <light-component .lightId=${light.id}></light-component>
          `;
        })}
      </grid-component>
    `;
  }
}
