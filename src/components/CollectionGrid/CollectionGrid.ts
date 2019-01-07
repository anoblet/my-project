import * as style from "./CollectionGrid.scss";
import { LitElement, html, property } from "@polymer/lit-element";
import template from "./CollectionGridTemplate";
import { Mixin } from "../../../packages/Mixin";
import { FirebaseMixin } from "../../../packages/FirebaseMixin";

export class CollectionGrid extends Mixin(LitElement, [FirebaseMixin]) {
  @property({ type: Array }) collection: any;
  @property({ type: Object }) model: any;
  @property({ type: String }) path: string;
  @property({ type: String }) route: string;
  @property({ type: Boolean }) dialogOpened: boolean;

  firstUpdated() {
    super.firstUpdated();
    console.log(this.route);
    if (this[this.route]) {
      this._template = this[this.route]();
      this.requestUpdate();
    }
    this.getCollection({
      path: this.path,
      callback: (collection: any) => {
        this.collection = collection;
      },
      watch: true
    });
  }

  create() {
    let formData: any = {};
    this.model.map((field: any) => {
      formData[field.name] = this.shadowRoot.querySelector(
        `[name='${field.name}']`
      ).value;
    });
    this.addDocument({ path: this.path, data: formData });
    this.dialogOpened = false;
  }

  read() {
    const document = this.getDocument({ path: "" });
    return html`
      ${
        this.model.map(
          (field: any) =>
            html`
              ${field.label}:
            `
        )
      }
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
      ${template.bind(this)()}
    `;
  }
}

window.customElements.define("collection-grid", CollectionGrid);
