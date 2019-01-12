import * as style from "./CollectionGrid.scss";
import { LitElement, html, property } from "lit-element";
import template from "./CollectionGridTemplate";
import { Mixin } from "../../../packages/Mixin";
import { FirebaseMixin } from "../../../packages/FirebaseMixin";

/**
 * Firebase collection CRUD class
 */

export class CollectionGrid extends Mixin(LitElement, [FirebaseMixin]) {
  @property({ type: Array }) protected _collection: any; // Protected placeholder for a collection
  @property({ type: Object }) protected _document: any; // Protected placeholder for a document
  @property({ type: Object }) public model: any; // Structure of the collection
  @property({ type: String }) public path: string; // The path to the Firebase collection
  @property({ type: String }) public route: string = "index"; // A request path (for sub-routes)
  @property({ type: Boolean }) public dialogOpened: boolean;
  /**
   * Function that returns a TemplateResult
   */
  public _template = () => html``;

  /**
   * Parse route, execute action
   */
  public firstUpdated() {
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
  public index() {
    this.getCollection({
      path: this.path,
      callback: (collection: any) => {
        this._collection = collection;
      },
      watch: true
    });
    this._template = template.bind(this);
  }

  /**
   * Create action
   */
  public create() {
    const formData: any = {};
    this.model.map((field: any) => {
      formData[field.name] = this.shadowRoot.querySelector(
        `[name='${field.name}']`
      ).value;
    });
    this.addDocument({ path: this.path, data: formData });
    this.dialogOpened = false;
    this._template = template.bind(this);
  }

  public read(id: string) {
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

  public delete(index: number) {
    const item = this._collection[index];
    this.deleteDocument({ path: `${this.path}/${item.id}` });
  }

  public render() {
    return html`
      <style>
        ${style}
      </style>
      ${this._template()}
    `;
  }
}

window.customElements.define("collection-grid", CollectionGrid);
