import { html } from "lit-element";

export default function() {
  return html`
    <card-component>
      <div id="title">
        <slot name="title"></slot><span @click=${this.close}>X</span>
      </div>
      <slot name="content"></slot>
    </card-component>
  `;
}
