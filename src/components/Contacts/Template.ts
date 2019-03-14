import { html } from "lit-element";
import("../Button/ButtonComponent");

export default function() {
  return html`
    <card-component title="Contacts">
      <grid-component id="buttons">
        <button-component label="In" @click=${this.in}></button-component>
        <button-component label="Out" @click=${this.out}></button-component>
      </grid-component>
      <grid-component>
        ${this.data.log.map(
          entry => html`
            <div>${entry.type} ${new Date(entry.time).toLocaleString()}</div>
          `
        )}
      </grid-component>
    </card-component>
  `;
}
