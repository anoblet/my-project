import { LitElement, html, property } from "@polymer/lit-element";
import * as style from "./Quill.scss";
const Quill = require("quill");
import { unsafeHTML } from "lit-html/directives/unsafe-html";

export class QuillDisplay extends LitElement {
  @property({ type: String }) html: string;
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
    this.html = quill.root.innerHTML;
  }

  render() {
    return html`
      <style>
        [hidden] {
          display: none;
        }
      </style>
      ${unsafeHTML(this.html)}
      <div hidden><div id="editor"></div></div>
    `;
  }
}

window.customElements.define("quill-display", QuillDisplay);
