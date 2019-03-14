import { html } from "lit-element";
import("../Button/ButtonComponent");

export default function() {
  return html`
    <card-component title="Contacts">
      <grid-component>
        <button-component label="In" @click=${this.in}></button-component>
        <button-component label="Out" @click=${this.out}></button-component>
      </grid-component>
      ${this.data.map(
        entry => html`
          ${entry.time}
        `
      )}
    </card-component>
  `;
}
