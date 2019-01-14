import { css, html, LitElement, property } from "lit-element";
import { getDocument } from "../../../packages/firebase-helpers";

export class Document extends LitElement {
  @property({ type: String }) path: string;
  _data: any;

  template: any = () =>
    html`
      ${JSON.stringify(this._data)}
    `;

  firstUpdated() {
    this._data = await getDocument(this.path);
  }

  create() {}
  async read() {
    this._data = await getDocument(this.path);
  }
  update() {}
  delete() {}

  render() {
    return this.template();
  }
}

window.customElements.define("firebase-document", Document);
