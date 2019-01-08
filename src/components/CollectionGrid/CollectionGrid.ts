import * as style from "./CollectionGrid.scss";
import { LitElement, html, property } from "@polymer/lit-element";
import template from "./CollectionGridTemplate";
import { Mixin } from "../../../packages/Mixin";
import { FirebaseMixin } from "../../../packages/FirebaseMixin";

export class CollectionGrid extends Mixin(LitElement, [FirebaseMixin]) {
  @property({ type: Array }) collection: any;
  @property({ type: Object }) model: any;
  @property({ type: String }) path: string;
  @property({ type: String }) route: string = "index";
  @property({ type: Boolean }) dialogOpened: boolean;
  document: any;
  /**
   * Function that returns a TemplateResult
   */
  _template = () => html``;

  /**
   * Parse route, execute action
   */
  firstUpdated() {
    super.firstUpdated();
    const parts = this.route ? this.route.split("/") : [];
    const action = parts[0] || "index";
    const id = parts[1];
    if (this[action]) {
      this[action](id);
    }
  }

  /**
   * Index action
   * @return [description]
   */
  index() {
    this.getCollection({
      path: this.path,
      callback: (collection: any) => {
        this.collection = collection;
      },
      watch: true
    });
    this._template = template.bind(this);
  }

  /**
   * Create action
   */
  create() {
    let formData: any = {};
    this.model.map((field: any) => {
      formData[field.name] = this.shadowRoot.querySelector(
        `[name='${field.name}']`
      ).value;
    });
    this.addDocument({ path: this.path, data: formData });
    this.dialogOpened = false;
    this._template = template.bind(this);
  }

  read(id: string) {
    import("./FirebaseDocument");
    this.watchDocumentNew({
      path: `${this.path}/${id}`,
      callback: (document: any) => {
        this.document = document;
        this.requestUpdate();
      }
    });
    this._template = () => html`
      <firebase-document .path="${`${this.path}/${id}`}"></firebase-document>
    `;
  }

  delete(index: number) {
    const item = this.collection[index];
    this.deleteDocument({ path: `${this.path}/${item.id}` });
  }

  render() {
    return html`
      <style>
        ${style}
      </style>
      ${this._template()}
    `;
  }
}

window.customElements.define("collection-grid", CollectionGrid);
