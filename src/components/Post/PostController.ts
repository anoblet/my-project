import("../PostComponent/PostComponent");
import("./PostGridComponent");

import * as style from "./PostController.scss";

import { LitElement, html, property } from "lit-element";
import { addDocument, deleteDocument, getCollection } from "../../Firebase";

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
    this.action = this.action || "index";
    debug(this.action);
    if (this.action === "index") {
      navigate("/post/read");
    } else {
      if (this[this.action]) this[this.action](this.id);
    }
    if (this.action !== "read") this.requestUpdate();
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
      .catch((error: any) => toast("Missing or insufficient permission"));
  }

  public read(id: any) {
    return id && id != "undefined" ? this.readSingle(id) : this.readMulti();
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

  public submitForm(e: any) {
    e.preventDefault();
    const data: any = {};
    data.title = (this.shadowRoot.querySelector(
      "[name='title']"
    ) as HTMLInputElement).value;
    data.author = (this.shadowRoot.querySelector(
      "[name='author']"
    ) as HTMLInputElement).value;
    data.content = (this.shadowRoot.querySelector(
      "[name='content']"
    ) as HTMLInputElement).value;
    addDocument({ path: "posts", data }).then((result: any) => {
      this.shadowRoot.querySelector(
        "#result"
      ).innerHTML = `Document created: ${result}. Waitng 2 seconds for a redirect to your post.`;
      setTimeout(
        () => this.store.dispatch(navigate(`/post/read/${result}`)),
        2000
      );
    });
  }

  public render() {
    return html`
      <style>
        ${style}
      </style>
      ${this.template}
    `;
  }
}

window.customElements.define("post-controller", PostController);
