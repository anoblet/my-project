import { LitElement, css, html, property } from "lit-element";
import { Mixin } from "../../../packages/Mixin";
import { TemplateMixin } from "../../../packages/TemplateMixin";
import { navigate } from "../../Router";
import { store } from "../../Store";
import {
  addDocument,
  getDocument,
  updateDocument
} from "../../../packages/firebase-helpers";
import { toast } from "../ToastComponent/Toast";
import("../../../packages/PellComponent/PellComponent");

import { structure } from "./PostStructure";
import template from "./PostTemplate";

import globalStyle from "../../GlobalStyle";

import { renderForm } from "../PropertyEditor/PropertyEditor";

export interface PostComponent {
  [key: string]: any; // Add index signature
}

export class PostComponent extends Mixin(LitElement, [TemplateMixin]) {
  @property({ type: Boolean }) editable: boolean;
  @property({ type: String }) content: string;
  @property({ type: Boolean }) create: boolean;

  template = template;

  constructor() {
    super();
    this.model = structure;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.id)
      getDocument({
        path: `posts/${this.id}`,
        callback: (document: any) => {
          if (document) {
            const keys = Object.keys(document);
            keys.map((key: any) => (this[key] = document[key]));
            this.loaded = true;
            this.requestUpdate();
          }
        },
        watch: true
      });
  }

  // shouldUpdate() {
  //   if (!this.loaded) return false;
  //   else return super.shouldUpdate();
  // }

  text({ field, value }: any) {
    return html`
      <label>${field.label}</label>:
      <input
        name="${field.name}"
        label="${field.label}"
        type="text"
        value="${value ? value : ""}"
      />
    `;
  }

  textarea({ field, value }: any) {
    return html`
      <textarea name="${field.name}">${value}</textarea>
    `;
  }

  submitForm(e: any) {
    e.preventDefault();
    const title = this.shadowRoot.querySelector("[name='title']").value;
    const author = this.shadowRoot.querySelector("[name='author']").value;
    const content = this.shadowRoot.querySelector("[name='content']").value;
    let sortOrder = this.shadowRoot.querySelector("[name='sortOrder']").value;
    sortOrder = parseInt(sortOrder);
    const data: any = {
      title,
      author,
      content,
      sortOrder
    };

    if (this.create) {
      addDocument({ path: "posts", data })
        .then((result: any) => {})
        .then(() => toast("Document added"))
        .catch(error => toast("Error"));
    } else {
      updateDocument({ path: `posts/${this.id}`, data })
        .then((result: any) => {
          this.editable = !this.editable;
        })
        .then(() => toast("Document updated"))
        .catch(error =>
          toast(
            "Error, could not update the document. Maybe you do not have the right permissions?"
          )
        );
    }
  }

  static get properties() {
    return {
      // body: { label: "Body", type: String, inputType: "textarea" },
      content: { label: "Body", type: String, inputType: "pell" },
      date: { label: "Date", type: String },
      id: { label: "ID", type: String },
      title: { label: "Title", type: String, description: "Title of the post" },
      author: { label: "Author", type: String },
      sortOrder: { label: "Sort order", type: Number }
    };
  }

  static get styles() {
    return [
      globalStyle,
      css`grid-component {
          grid-template-columns: 1fr !important;`
    ];
  }

  render() {
    return this.loaded
      ? html`
          <card-component>
            ${renderForm(
              this,
              null,
              (property: string, value: any) => (this[property] = value)
            )}
            <div slot="actions">
              <mwc-button outlined @click=${(e: any) => this.submitForm(e)}>Save</mwc-button>
            </div>
          </card-component>
        `
      : html``;
  }
}

window.customElements.define("post-component", PostComponent);
