import { html } from "lit-element";

export default function() {
  return html`
    <a
      href="https://github.com/anoblet/my-project"
      rel="noreferrer"
      target="_blank"
    >
      <i class="material-icons" @click="${this._toggleDrawer}">code</i>
    </a>
    <a href="/">
      <i class="material-icons" @click="${this._toggleDrawer}">home</i>
    </a>
    <a href="mailto: andrewbnoblet@gmail.com">
      <i class="material-icons" @click="${this._toggleDrawer}">mail_outline</i>
    </a>
  `;
}
