import { html } from "lit-element";
import { close } from "@anoblet/material-icons";

export default function() {
  return html`
    <card-component>
      <div id="title" slot="title">
        <slot name="title"></slot><span id="close-button" class="icon" @click=${this.close}>${close}</span>
      </div>
      <div id="content"><slot name="content"></slot></div>
    </card-component>
  `;
}
