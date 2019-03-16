import { LitElement, html, property } from "lit-element";
import {
  addDocument,
  getDocument,
  updateDocument
} from "../../Firebase";

import { Mixin } from "../../../packages/Mixin";
import { TemplateMixin } from "../../../packages/TemplateMixin";
import globalStyle from "../../GlobalStyle";
import { renderForm } from "../PropertyEditor/PropertyEditor";
import style from "./PostStyle";
import { toast } from "../Toast/Toast";

import("../../../packages/PellComponent/PellComponent");

export interface PostComponent {
  [key: string]: any; // Add index signature
}

export class PostComponent extends Mixin(LitElement, [TemplateMixin]) {
  @property({ type: String }) public content: string;
  @property({ type: Boolean }) public create: boolean;
  @property({ type: Boolean, reflect: true, attribute: "hidden" })
  @property()
  public taskPending = true;

  public async beforeRender() {
    if (this.id)
      return await getDocument({
        path: `posts/${this.id}`
      }).then((document: any) => {
        if (document) {
          Object.keys(document).map((key: any) => (this[key] = document[key]));
          this.taskPending = false;
        }
      });
    else {
      this.taskPending = false;
    }
  }

  public submitForm(e: any) {
    e.preventDefault();
    const data: any = {};
    const constructor: any = this.constructor;
    const properties = constructor.properties;
    Object.keys(properties).map((key: any) => {
      if (properties[key].type === Number)
        data[key] = parseInt(
          this.shadowRoot.querySelector(`[name=${key}]`).value,
          10
        );
      else data[key] = this.shadowRoot.querySelector(`[name=${key}]`).value;
    });

    if (this.create)
      addDocument({ path: "posts", data })
        .then(() => toast("Document added"))
        .catch(() => toast("Error: Document not added"));
    else
      updateDocument({ path: `posts/${this.id}`, data })
        .then(() => {
          this.editable = !this.editable;
        })
        .then(() => toast("Document updated"))
        .catch(() => toast("Error: Document not updated"));
  }

  public shouldUpdate(changedProperties: any) {
    return !this.taskPending && super.shouldUpdate(changedProperties);
  }

  // Property editor respects this order...
  static get properties() {
    return {
      id: { disabled: true, label: "ID", type: String },
      title: { label: "Title", type: String, description: "Title of the post" },
      author: { label: "Author", type: String },
      date: { label: "Date", type: String },
      sortOrder: { label: "Sort order", type: Number },
      featured: { label: "Featured", type: Boolean },
      body: { label: "Body", type: String, inputType: "pell" }
    };
  }

  static get styles() {
    return [globalStyle, style];
  }

  public render() {
    return html`
      <card-component>
        ${renderForm(
          this,
          null,
          (_property: string, value: any) => (this[_property] = value)
        )}
        <div slot="actions">
          <mwc-button outlined @click=${(e: any) => this.submitForm(e)}
            >Save</mwc-button
          >
        </div>
      </card-component>
    `;
  }
}

window.customElements.define("post-component", PostComponent);
