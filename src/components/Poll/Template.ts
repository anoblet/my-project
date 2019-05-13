import { html } from "lit-element";
import "../Dialog/Component";

export default function() {
  return html`
    <button-component
      label="Create"
      outlined
      @click=${this.createDialog}
    ></button-component>
    <dialog-component id="create-dialog" fixed
      ><div slot="title">Create</div>
      <div slot="content">${createDialog.bind(this)()}</div></dialog-component
    >
  `;
}

const createDialog = function() {
  return html`
    <form id="create">
      <label for="title"></label><input id="title" type="text" name="title" />
      <button-component label="save" @click=${this.save}></button-component>
    </form>
  `;
};
