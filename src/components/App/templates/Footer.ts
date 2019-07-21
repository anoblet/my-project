import "@anoblet/tabs-component";

import { code, home, mail_outline } from "../../../Icons";

import { html } from "lit-element";

export default function() {
  return html`
    <tabs-component
      ><a href="https://github.com/anoblet/my-project"><div>${code}</div></a>
      <a href="/"><div>${home}</div></a>
      <a href="mailto:andrewbnoblet@gmail.com"><div>${mail_outline}</div></a></tabs-component
    >
  `;
}
