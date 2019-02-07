import { css, html, LitElement, property } from "lit-element";
import { getDocument } from "../../../packages/firebase-helpers";

export class Document extends LitElement {
  @property({ type: String }) public path: string;
  public _data: any;

  public template: any = () =>
    html`
      ${JSON.stringify(this._data)}
    `

  public async firstUpdated() {
    this._data = await getDocument(this.path);
  }

  public create() {}
  public async read() {
    this._data = await getDocument(this.path);
  }
  public update() {}
  public delete() {}

  public render() {
    return this.template();
  }
}

window.customElements.define("firebase-document", Document);
