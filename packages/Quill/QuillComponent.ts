import { LitElement, html, property } from "lit-element";
import * as style from "./Quill.scss";
import Quill from "./QuillImport";

export class QuillComponent<LitElement> extends LitElement {
  @property({ type: String }) value: string;

  firstUpdated() {
    const container = this.shadowRoot.querySelector("#editor");
    const options = {
      bounds: this.shadowRoot.querySelector("#editor"),
      // debug: "info",
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
