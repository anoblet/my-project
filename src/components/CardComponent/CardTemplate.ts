import { html } from "lit-element";
import { render } from "lit-html";

export default function() {
  return html`
    ${
      this.title
        ? html`
            <h3>${this.title}</h3>
          `
        : ""
    } <slot name="title"></slot>
    <div class="content"><slot name="content"></slot></div>
    <div class="actions"><slot name="actions"></slot></div>
  `;
}
