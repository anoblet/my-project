import { html } from "lit-element";
export default function() {
  return html`
    Speech:
    <button @click="${() => this.recognition.start()}">Listen</button> Text:
    ${this.text}
  `;
}
