import { html } from "lit-element";
import { render } from "lit-html";

export default function() {
  return html`
    ${
      this._collection.map((document: any) =>
        this.renderer ? this.renderer(document) : ""
      )
    }
  `;
}
