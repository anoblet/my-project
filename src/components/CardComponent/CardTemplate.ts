import { html } from "lit-element";
import { render } from "lit-html";

export default function() {
  return html`
    ${
      this.title
        ? html`
            <h3>${this.title}</h3>
          `
        : html`
            <slot name="title"></slot>
          `
    } <slot name="content"> </slot><slot> </slot> <slot name="actions"></slot>
  `;
}
