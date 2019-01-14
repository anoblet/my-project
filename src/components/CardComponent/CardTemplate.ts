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
    }
    <div class="content"><slot></slot></div>
    <div class="actions"><slot name="actions"></slot></div>
  `;
}
