import { html } from "@polymer/lit-element";

export default function() {
  return html`
    Author: ${this.author} Content: ${this.content}
  `;
}
