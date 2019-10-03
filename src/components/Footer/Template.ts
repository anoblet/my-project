import { html } from "lit-element";
import { code, home, mail_outline } from "@anoblet/material-icons";

export default function() {
  return html`
    <a
      href="https://github.com/anoblet/my-project"
      rel="noreferrer"
      target="_blank"
      class="item"
      @click="${this._toggleDrawer}"
      aria-label="Source"
    >
      ${code}
    </a>
    <a id="home" href="/" class="item" @click="${this._toggleDrawer}" aria-label="Home">
      ${home}
    </a>
    <a
      href="mailto: andrewbnoblet@gmail.com"
      class="item"
      @click="${this._toggleDrawer}" aria-label="Email"
    >
      ${mail_outline}
    </a>
  `;
}
