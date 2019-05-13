import { html } from "lit-element";
import "../Dialog/Component";

export default function() {
  return html`
    <button-component
      label="Create"
      outlined
      @click=${this.createDialog}
    ></button-component>
    <dialog-component id="create-dialog"
      ><div slot="title">Create</div>
      <div slot="content">${createDialog}</div></dialog-component
    >
  `;
}

const createDialog = html`
  Test
`;
