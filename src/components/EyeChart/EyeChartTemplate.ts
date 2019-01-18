import { html } from "lit-element";

export default function() {
  return html`
    <input
      type="number"
      value="${this.lines}"
      @input="${(e: any) => (this.lines = parseInt(e.target.value))}"
    />
    <button @click="${this.previousCharacter}">Previous</button>
    <button @click="${this.nextCharacter}">Next</button> ${this.getChart()}
    <button @click="${this.performUpdate}">Refresh</button>
  `;
}
