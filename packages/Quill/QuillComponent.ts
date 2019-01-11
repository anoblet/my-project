import { LitElement, html, property } from "@polymer/lit-element";
import * as style from "./Quill.scss";
import Quill from "./QuillImport";

export class QuillComponent<LitElement> extends LitElement {
  @property({ type: String }) value: string;

  firstUpdated() {
    const container = this.shadowRoot.querySelector("#editor");
    const options = {
      bounds: this.shadowRoot.querySelector("#editor"),
      debug: "info",
      scrollingContainer: this,
      theme: "snow"
    };
    const quill = new Quill(container, options);
    if (this.value) quill.setContents(JSON.parse(this.value));
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
    // const toolbar = this.shadowRoot.querySelector(".ql-toolbar button.ql-bold");
    // toolbar.addEventListener("click", (e: Event) => {
    //   e.preventDefault();
    //   e.stopPropagation();
    // });
    // toolbar.addEventListener("mousedown", (e: Event) => {
    //   e.preventDefault();
    // });
    // toolbar.addEventListener("mousemove", (e: Event) => {
    //   e.preventDefault();
    //   e.stopPropagation();
    // });
  }

  render() {
    return html`
      <style>
        ${style} :host {
          overflow-y: auto;
        }
      </style>
      <div id="toolbar"></div>
      <div id="editor"></div>
    `;
  }
}

window.customElements.define("quill-component", QuillComponent);
