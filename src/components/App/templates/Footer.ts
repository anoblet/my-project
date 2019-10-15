import "@anoblet/tabs-component";

import { code, home, mail_outline } from "@anoblet/material-icons";

import { html } from "lit-element";

export default function() {
  return html`
    <tabs-component
      ><a href="https://github.com/anoblet/my-project" aria-label="Code"
        >${code}</a
      >
      <a href="/" aria-label="Home">${home}</a>
      <a href="mailto:andrewbnoblet@gmail.com" aria-label="Contact"
        >${mail_outline}</a
      ></tabs-component
    >
  `;
}
