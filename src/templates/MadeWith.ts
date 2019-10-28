import { html } from "lit-element";

export default function() {
  return html`
    <card-component
      ><div style="flex: 1; align-items: center;" slot="body">
        Made with &hearts; by Andrew Noblet
      </div></card-component
    >
  `;
}
