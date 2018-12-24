import { html } from "@polymer/lit-element";

export default function() {
  return html`
    <my-card>
      <h3 slot="title">${this.title}</h3>
      <div slot="content">${this.form()}</div></my-card
    >
  `;
}
