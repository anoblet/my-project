import { html } from "lit-element";
import { render } from "lit-html";

export default function() {
  return html`
    ${this.title
      ? html`
          <div id="title">
            <h3>${this.title}</h3>
            ${this.collapsible
              ? html`
                  <i class="material-icons"
                    >${this.collapsed ? "expand_more" : "expand_less"}</i
                  >
                `
              : ""}
          </div>
        `
      : html`
          <slot name="title"></slot>
        `}
    <div id="content"><slot name="content"> </slot><slot> </slot></div>
    <slot name="actions"></slot>
  `;
}
