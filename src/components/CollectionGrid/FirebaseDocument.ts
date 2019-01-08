// import * as style from "./FirebaseDocument.scss";
import { LitElement, html, property } from "@polymer/lit-element";
import { Mixin } from "../../../packages/Mixin";
import { FirebaseMixin } from "../../../packages/FirebaseMixin";

const style = html`
  :host { display: flex; }
`;

export class FirebaseDocument extends Mixin(LitElement, [FirebaseMixin]) {
  firstUpdated() {
    this.watchDocumentNew({
      path: this.path,
      callback: (document: any) => {
        this.document = document;
        this.requestUpdate();
      }
    });
  }
  render() {
    return html`
      <style>
        ${style}
      </style>
      ${JSON.stringify(this.document)}
    `;
  }
}

window.customElements.define("firebase-document", FirebaseDocument);
