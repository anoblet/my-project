import { html } from "lit-element";

export default function() {
  return html`
    <button-component
      label="Create"
      outlined
      @click=${this.createDialog}
    ></button-component>
    <dialog-component id="create-dialog" title="Create"
      ><div slot="content">${createDialog}</div></dialog-component
    >
  `;
}

const createDialog = html`
  Test
`;
