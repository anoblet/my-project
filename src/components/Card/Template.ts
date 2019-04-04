import { html } from "lit-element";

export default function() {
  return html`
    <div id="title">
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
              >${this.collapsed ? "expand_less" : "expand_more"}</i
            >
          `
        : ""}
    </div>
    <div id="content"><slot name="content"> </slot><slot> </slot></div>
    <slot name="actions"></slot>
  `;
}
