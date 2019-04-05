import("../Post/PostComponent");
import("./PostGridComponent");

import { LitElement, css, html, property } from "lit-element";
import { deleteDocument, getCollection } from "../../Firebase";

import { debug } from "../../Debug";
import { navigate } from "../../Router";
import { store } from "../../Store";
import { toast } from "../Toast/Toast";

export interface PostController {
  [key: string]: any; // Add index signature
}

export class PostController extends LitElement {
  @property({ type: String }) public action: string = "index";
  public template: any;

  public connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    this.addEventListener("item-deleted", (e: any) =>
      this.itemDeleted(e.detail)
    );
    this.setStore(store);
  }

  public firstUpdated() {
    // if (super.firstUpdated) super.firstUpdated();
    // this.action = this.action || "index";
    // if (this.action === "index") {
    //   navigate("/post/read");
    // } else {
    //   if (this[this.action]) this[this.action](this.id);
    // }
    // if (this.action !== "read") this.requestUpdate();
  }

  public create() {
    this.template = html`
      <post-component create editable></post-component>
    `;
    this.requestUpdate();
  }

  public edit(id: string) {
    this.template = html`
      <post-component editable id="${id}"></post-component>
    `;
    this.requestUpdate();
  }

  public itemDeleted(item: any) {
    deleteDocument({ path: `posts/${item.id}` })
      .then(() => toast("Item deleted"))
      .catch(() => toast("Missing or insufficient permission"));
  }

  public read(id: any) {
    return id && id !== "undefined" ? this.readSingle(id) : this.readMulti();
  }

  public readSingle(id: string) {
    this.template = html`
      <post-component id="${id}"></post-component>
    `;
    this.requestUpdate();
  }

  public readMulti() {
    const renderGrid = (collection: any) => {
      this.template = html`
        <post-grid-component .items="${collection}"></post-grid-component>
      `;
      this.requestUpdate();
    };

    getCollection({
      callback: renderGrid,
      path: "posts",
      watch: true
    });
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        flex: 1;
        flex-direction: column;
      }

      #navigation {
        display: grid;
        grid-gap: 1em;
        grid-template-columns: repeat(2, 1fr);
        margin: 0 auto;
        margin-bottom: 1em;
        width: min-content;
      }

      #table {
        grid-template-columns: min-content 1fr !important;
      }
    `;
  }

  public render() {
    return html`
      ${this.template}
    `;
  }
}

window.customElements.define("post-controller", PostController);
