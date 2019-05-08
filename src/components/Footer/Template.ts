import { html } from "lit-element";
import { code, home, mail_outline } from "../../Icons";

export default function() {
  return html`
    <a
      href="https://github.com/anoblet/my-project"
      rel="noreferrer"
      target="_blank"
      class="item"
      @click="${this._toggleDrawer}"
    >
      ${code}
    </a>
    <a id="home" href="/" class="item" @click="${this._toggleDrawer}">
      ${home}
    </a>
    <a
      href="mailto: andrewbnoblet@gmail.com"
      class="item"
      @click="${this._toggleDrawer}"
    >
      ${mail_outline}
    </a>
  `;
}
