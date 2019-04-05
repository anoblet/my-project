import { html } from "lit-element";

export default function() {
  return html`
    <button @click=${this.getLocation}>Test</button>
  `;
}
