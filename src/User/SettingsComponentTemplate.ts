import { html } from "lit-element";

export default function() {
  return html`
    <style>
      .description {
        display: block;
        font-size: 0.5em;
        padding: 1em 0;
      }
    </style>
    <my-card>
      <h3 slot="title">${this.title}</h3>
      <div slot="content">${this.form()}</div></my-card
    >
  `;
}
