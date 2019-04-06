import { html } from "lit-element";

export default function() {
  switch (this.theme) {
    case "material":
      return html`
        <mwc-button label=${this.label}></mwc-button>
      `;
    default:
      return html`
        <button>${this.label}<slot></slot></button>
      `;
  }
}
