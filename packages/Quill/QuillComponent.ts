import { LitElement, html, property } from "@polymer/lit-element";
import * as style from "./Quill.scss";
const Quill = require("quill");
import { unsafeHTML } from "lit-html/directives/unsafe-html";

export class QuillComponent extends LitElement {
  @property({ type: Object }) delta: any;
  @property({ type: String, reflect: true }) value: string;
  @property({ type: String }) html: string;
  @property({ type: Boolean }) output: boolean;

  firstUpdated() {
    const container = this.output
      ? document.createElement("div")
      : this.shadowRoot.querySelector("#editor");
    const options = this.output
      ? {}
      : {
          modules: {
            toolbar: this.shadowRoot.querySelector("#toolbar")
          },
          theme: "snow"
        };
    const quill = new Quill(container, options);
    const content = JSON.parse(this.value);
    quill.setContents(content);
    if (this.output) {
      this.html = quill.root.innerHTML;
    } else {
      quill.on("text-change", (value: any) => {
        // this.delta = quill.getContents();
        this.value = JSON.stringify(quill.getContents());
        this.html = quill.root.innerHTML;
      });
    }
  }
  render() {
    console.log(this.html);
    return html`
      <style>
        ${style}
      </style>
      ${unsafeHTML(this.html)} ${this.html}
      <div><div id="editor"></div></div>
    `;
  }
}

window.customElements.define("quill-component", QuillComponent);
