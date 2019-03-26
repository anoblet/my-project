import { LitElement, css, customElement, html, property } from "lit-element";
import { status, turnOff, turnOn } from "./PhilipsHue";
import GlobalStyle from "../../GlobalStyle";

import { BeforeRender } from "../../mixins/BeforeRender";

const Style = css`
  :host {
  }

  span {
    text-align: center;
  }
`;

@customElement("light-component")
export class Light extends BeforeRender(LitElement) {
  @property() on: boolean;
  @property() lightId: string;
  @property() name: any;

  async beforeRender() {
    await this.refreshState();
  }

  async refreshState() {
    const _status = await status({
      ip: "192.168.43.221",
      user: "mWHCs99pkPAniHe0lsSG8ES7qG1xDF8qDQw0h0dN",
      id: this.lightId
    });
    this.name = _status.name;
    this.on = _status.state.on;
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

  static styles = [GlobalStyle, Style];

  render() {
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
