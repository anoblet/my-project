import { html } from "lit-element";
import { expand_less, expand_more } from "../../Icons";

export default function() {
  return html`
    <div id="title" part="title">
      ${this.title
        ? html`
            <h3>${this.title}</h3>
          `
        : html`
            <slot name="title"></slot>
          `}
      ${this.collapsible
        ? this.collapsed
          ? expand_more
          : expand_less
        : html``}
    </div>
    <div id="content" part="content-container">
      <slot name="content" part="content"> </slot><slot> </slot>
    </div>
    <slot name="actions" part="actions"></slot>
  `;
}
