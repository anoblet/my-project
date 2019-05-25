import { html } from "lit-element";

export default function() {
  return html`<button @click=${this.clap}>Clap</button> Count ${this.count}`;
}
