import { html } from "@polymer/lit-element";
import { render } from "lit-html";

export default function() {
  console.log(this.items);
  return html`
    <vaadin-grid .items="${this.items}">
      <vaadin-grid-column
        path="id"
        header="#"
        .renderer="${
          (root: any, column: any, rowData: any) => {
            const template = html`
              ${rowData.index}
            `;
            render(template, root);
          }
        }"
      ></vaadin-grid-column>
      <vaadin-grid-column
        path="title"
        header="Title"
        .renderer="${
          (root: any, column: any, rowData: any) => {
            const template = html`
              <a href="/post/read/${rowData.item.id}">${rowData.item.title}</a>
            `;
            render(template, root);
          }
        }"
      ></vaadin-grid-column>
      <vaadin-grid-column path="author" header="Author"> </vaadin-grid-column>
      <vaadin-grid-column
        path="author"
        header="Delete"
        .renderer="${
          (root: any, column: any, rowData: any) => {
            const button = html`
              <button @click="${() => this.deleteItem(rowData.index)}">
                Delete
              </button>
            `;
            render(button, root);
          }
        }"
      >
      </vaadin-grid-column>
    </vaadin-grid>
  `;
}
