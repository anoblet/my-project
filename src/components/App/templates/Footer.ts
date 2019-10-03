import "@anoblet/tabs-component";

import { code, home, mail_outline } from "@anoblet/material-icons";

import { html } from "lit-element";

export default function() {
  return html`
    <tabs-component
      ><a href="https://github.com/anoblet/my-project" aria-label="Code"
        ><div>${code}</div></a
      >
      <a href="/" aria-label="Home"><div>${home}</div></a>
      <a href="mailto:andrewbnoblet@gmail.com" aria-label="Contact"
        ><div>${mail_outline}</div></a
      ></tabs-component
    >
  `;
}
