import { html } from "lit-element";

export default function() {
  return html`
    <div id="clock">${this.time}</div>
  `;
}
