import { html } from "@polymer/lit-element";

export default function() {
  return html`
    <vaadin-grid .items="${this.items}">
      <vaadin-grid-filter-column
        path="id"
        header="ID"
      ></vaadin-grid-filter-column>
      <vaadin-grid-filter-column path="author" header="Author">
        <template
          ><a href="/post/read/[[item.id]]">[[item.author]]</a></template
        >
      </vaadin-grid-filter-column>
      <vaadin-grid-column path="title" header="Title"></vaadin-grid-column>
    </vaadin-grid>
  `;
}
