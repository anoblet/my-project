import { html, LitElement, property } from "lit-element";
import * as style from "./Dialog.scss";

export class Dialog extends LitElement {
  @property({ type: Boolean, reflect: true }) hidden: any = true;

  open() {
    this.hidden = false;
  }

  render() {
    return html`
      <style>
        ${style}
      </style>
      <div id="overlay">
        <div class="relative">
          <button @click="${() => (this.hidden = !this.hidden)}">Close</button
          ><slot></slot>
        </div>
      </div>
    `;
  }
}

window.customElements.define("my-dialog", Dialog);
