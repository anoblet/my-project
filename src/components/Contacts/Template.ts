import { html } from "lit-element";
import { render } from "lit-html";

export default function() {
  return html`
    <card-component title="Contacts">
      <button-component label="In" @click=${this.in}></button-component>
      <button-component label="Out" @click=${this.out}></button-component>
    </card-component>
  `;
}
