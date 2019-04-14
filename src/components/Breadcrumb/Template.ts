import { html } from "lit-element";

export default function() {
  return html`
    ${this.format(this.activeRoute)}
  `;
}
