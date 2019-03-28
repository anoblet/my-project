import { LitElement, css, customElement, html, property } from "lit-element";
import { status, turnOff, turnOn } from "./PhilipsHue";

import { BeforeRender } from "../../mixins/BeforeRender";
import GlobalStyle from "../../GlobalStyle";
import { Light } from "./Light";

const Style = css`
  :host {
  }

  span {
    text-align: center;
  }
`;

@customElement("light-component")
export class Component extends BeforeRender(LitElement) {
  public light: Light;
  @property() public on: boolean;
  @property() public lightId: string;
  @property() public name: any;

  public async beforeRender() {
    await this.refreshState();
  }

  public async refreshState() {
    const _status = await status({
      ip: "192.168.43.221",
      user: "mWHCs99pkPAniHe0lsSG8ES7qG1xDF8qDQw0h0dN",
      id: this.lightId
    });
    this.name = _status.name;
    this.on = _status.state.on;
  }

  public async turnOn() {
    await turnOn({
      ip: "192.168.43.221",
      user: "mWHCs99pkPAniHe0lsSG8ES7qG1xDF8qDQw0h0dN",
      id: this.lightId
    });
    this.refreshState();
  }

  public async turnOff() {
    await turnOff({
      ip: "192.168.43.221",
      id: this.lightId
    });
    this.refreshState();
  }

  construcor() {
    this.light = new Light();
    this.light.ip = "192.168.43.221";
    this.light.id = "mWHCs99pkPAniHe0lsSG8ES7qG1xDF8qDQw0h0dN";
  }

  public static styles = [GlobalStyle, Style];

  public render() {
    return html`
      <grid-component>
        <span>
          ${this.on
            ? html`
                <i class="material-icons">brightness_high</i>
              `
            : html`
                <i class="material-icons">brightness_low</i>
              `}
        </span>
        <span>${this.name}</span>
        <span>
          <button @click=${this.turnOn}>Turn on</button
          ><button @click=${this.turnOff}>Turn off</button>
        </span>
      </grid-component>
    `;
  }
}
