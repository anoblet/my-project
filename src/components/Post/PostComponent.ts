import "@anoblet/pell-component";

import { LitElement, html, property } from "lit-element";
import { addDocument, getDocument, updateDocument } from "../../Firebase";

import GlobalStyle from "../../GlobalStyle";
import Style from "./PostStyle";
import { renderForm } from "../PropertyEditor/PropertyEditor";
import { toast } from "../Toast/Toast";

export interface PostComponent {
  [key: string]: any; // Add index signature
}

export class PostComponent extends LitElement {
  @property({ type: String }) public content: string;
  @property({ type: Boolean }) public create: boolean;
  @property({ type: Boolean, reflect: true, attribute: "hidden" })
  @property()
  public taskPending = true;
  @property()
  public editable;

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
      const element: any = this.shadowRoot.querySelector(
        `[name=${key}]`
      );
      if (properties[key].type === Number)
        data[key] = parseInt(
          element.value,
          10
        );
      else data[key] = element.value;
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

  public static styles = [GlobalStyle, Style];

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
