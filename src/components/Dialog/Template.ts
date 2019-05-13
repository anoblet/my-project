import { html } from "lit-element";
import { close } from "../../Icons";

export default function() {
  return html`
    <card-component>
      <div id="title">
        <slot name="title"></slot><span @click=${this.close}>${close}</span>
      </div>
      <slot name="content"></slot>
    </card-component>
  `;
}
