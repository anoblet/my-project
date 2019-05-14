import "../Dialog/Component";

import { delete_outline } from "../../Icons";
import { html } from "lit-element";

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
      <grid-component>
        <grid-component columns="2">
          <label for="title">Title</label
          ><input id="title" type="text" name="title" />
        </grid-component>
        <div id="actions">
          <button-component
            label="Add item"
            @click=${this.addItem}
          ></button-component>
          <button-component label="Save" @click=${this.save}></button-component>
        </div>
        <grid-component columns="3">
          ${this.items.map(
            (item: any, index: number) =>
              html`
                <label>#${index}</label>
                <input
                  type="text"
                  .value=${item}
                  @input=${(e: any) => (this.items[index] = e.target.value)}
                />
                <span class="icon" @click=${() => this.removeItem(index)}
                  >${delete_outline}</span
                >
              `
          )}
        </grid-component>
      </grid-component>
    </form>
  `;
};
