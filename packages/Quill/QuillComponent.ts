import { LitElement, html, property } from "@polymer/lit-element";
import * as style from "./Quill.scss";
const Quill = require("quill");

export class QuillComponent extends LitElement {
  @property({ type: String }) value: string;

  firstUpdated() {
    const container = this.shadowRoot.querySelector("#editor");
    const options = {
      theme: "snow"
    };
    const quill = new Quill(container, options);
    if (this.value) {
      const content = JSON.parse(this.value);
      quill.setContents(content);
    }
    quill.on("text-change", (value: any) => {
      this.dispatchEvent(
        new CustomEvent("text-change", {
          bubbles: true,
          composed: true,
          detail: value
        })
      );
      this.value = JSON.stringify(quill.getContents());
    });
  }

  render() {
    return html`
      <style>
        ${style}
      </style>
      <div id="editor"></div>
    `;
  }
}

window.customElements.define("quill-component", QuillComponent);
