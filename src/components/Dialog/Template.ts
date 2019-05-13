import { html } from "lit-element";
import { close } from "../../Icons";

export default function() {
  return html`
    <card-component>
      <div id="title">
        ${this.title}<slot name="title"></slot
        ><span @click=${this.close}>${close}</span>
      </div>
      <div id="content">${this.content}<slot name="content"></slot></div>
    </card-component>
  `;
}
