// import * as style from "./CollectionGrid.scss";

import { LitElement, html, property } from "lit-element";
import { addDocument, deleteDocument, getCollection } from "../../Firebase";

import Style from "./Style";
import template from "./CollectionGridTemplate";

export interface CollectionGrid {
  [key: string]: any; // Add index signature
}

/**
 * Firebase collection CRUD class
 */

export class CollectionGrid extends LitElement {
  @property({ type: Array }) protected _collection: any; // Protected placeholder for a collection
  @property({ type: Object }) protected _document: any; // Protected placeholder for a document
  @property({ type: Object }) public model: any; // Structure of the collection
  @property({ type: String }) public path: string; // The path to the Firebase collection
  @property({ type: String }) public route: string = "index"; // A request path (for sub-routes)
  @property({ type: Boolean }) public dialogOpened: boolean;

  public static styles = [Style];

  /**
   * Function that returns a TemplateResult
   */
  public _template = () => html``;

  /**
   * Parse route, execute action
   */
  public firstUpdated(changedProperties: any) {
    super.firstUpdated(changedProperties);
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
    getCollection({
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
      const _field: any = this.shadowRoot.querySelector(
        `[name='${field.name}']`
      );
      formData[field.name] = _field.value;
    });
    addDocument({ path: this.path, data: formData });
    this.dialogOpened = false;
    this._template = template.bind(this);
  }

  public delete(index: number) {
    const item = this._collection[index];
    deleteDocument({ path: `${this.path}/${item.id}` });
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
