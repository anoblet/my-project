import "@anoblet/tabs-component";

import { code, home, mail_outline } from "../../../Icons";

import { html } from "lit-element";

export default function() {
  return html`
    <tabs-component
      ><div>${code}</div>
      <div>${home}</div>
      <div>${mail_outline}</div></tabs-component
    >
  `;
}
