import { html } from "lit-element";

export default function() {
  return html`
    ${requestPermission.bind(this)()}
  `;
}

export const requestPermission = function() {
  return html`
    <button @click=${this.requestPermission}
  `;
};
