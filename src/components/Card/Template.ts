import { html } from "lit-element";

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
        ? html`
            <i class="material-icons"
              >${this.collapsed ? "expand_more" : "expand_less"}</i
            >
          `
        : ""}
    </div>
    <div id="content" part="content-container">
      <slot name="content"> </slot><slot> </slot>
    </div>
    <slot name="actions"></slot>
  `;
}
