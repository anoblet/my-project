import { html } from "lit-element";

export default function() {
  return html`
    ${this.theme === "native"
      ? html`
          <button>${this.label}</button>
        `
      : ""}
    ${this.theme === "material"
      ? html`
          <mwc-button label=${this.label}></mwc-button>
        `
      : ""}
  `;
}
