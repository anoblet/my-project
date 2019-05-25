import { html } from "lit-element";

export default function() {
  return html`<button @click=${this.increaseCount}>Clap</button> Count ${this.count}`;
}
