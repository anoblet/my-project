import { html, LitElement, property } from "@polymer/lit-element";
import { until } from "lit-html/directives/until";
import { navigate } from "lit-redux-router";
import { store } from "../store.js";
import { connect } from "pwa-helpers/connect-mixin.js";
import { Mixin } from "../../packages/Mixin";
import { StateMixin } from "../../packages/StateMixin";
import { FirebaseMixin } from "../../packages/FirebaseMixin";
import { Post } from "./PostModel";
const serialize = require("form-serialize");

export interface PostController {
  [key: string]: any; // Add index signature
}

export class PostController extends Mixin(connect(store)(LitElement), [
  FirebaseMixin,
  StateMixin
]) {
  @property({ type: String }) action: string = "index";
  _template: any;

  connectedCallback() {
    super.connectedCallback();
    this.setStore(store);
    if (this[this.action]) this[this.action]();
  }

  index() {
    this._template = html`
      Index
    `;
  }

  create() {
    const post = new Post();
    this._template = html`
      <form>
        ${
          post.fields.map(
            (field: any) =>
              html`
                <label for="${field.name}">${field.label}</label>:<input
                  name="${field.name}"
                />
              `
          )
        }
        <button
          @click="${
            (e: Event) => {
              e.preventDefault();
              const form = this.shadowRoot.querySelector("form");
              const data = serialize(form, { hash: true });
              this.addDocument({ path: "posts", data });
            }
          }"
        >
          Serialize
        </button>
      </form>
    `;
  }

  read(id: any) {
    if (id) {
      this._template = this.getAppDocument(`posts/${id}`).then(
        (document: any) => {
          return html`
            <pre>${JSON.stringify(document)}</pre>
          `;
        }
      );
    } else {
      this._template = this.getCollection({ path: "posts", watch: true }).then(
        (collection: any) => {
          return html`
            <pre>${JSON.stringify(collection, null, 2)}</pre>
          `;
        }
      );
    }
  }

  render() {
    return html`
      <style>
        :host {
          display: flex;
          flex: 1;
        }
      </style>
      ${until(this._template, "")}
    `;
  }
}

window.customElements.define("post-controller", PostController);
