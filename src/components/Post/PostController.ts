import("../PostComponent/PostComponent");
import("./PostGridComponent");

import * as style from "./PostController.scss";

import { LitElement, html, property } from "lit-element";

import { FirebaseMixin } from "../../../packages/FirebaseMixin";
import { Mixin } from "../../../packages/Mixin";
import { StateMixin } from "../../../packages/StateMixin";
import { connect } from "pwa-helpers/connect-mixin.js";
import { model } from "./PostModel";
import { navigate } from "../../Router";
import navigation from "./NavigationTemplate";
import { store } from "../../Store";
import { until } from "lit-html/directives/until";

import { getCollection } from "../../../packages/firebase-helpers";
import { deleteDocument } from "../../../packages/firebase-helpers";

import { debug } from "../../Debug";

export interface PostController {
  [key: string]: any; // Add index signature
}

export class PostController extends Mixin(LitElement, [
  FirebaseMixin,
  StateMixin
]) {
  @property({ type: String }) action: string = "index";
  template: any;

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    this.addEventListener("item-deleted", (e: any) =>
      this.itemDeleted(e.detail)
    );
    this.setStore(store);
  }

  firstUpdated() {
    if (super.firstUpdated) super.firstUpdated();
    this.action = this.action || "index";
    debug(this.action);
    if (this.action == "index") {
      navigate("/post/read");
    } else {
      if (this[this.action]) this[this.action](this.id);
    }
    if (this.action !== "read") this.requestUpdate();
  }

  create() {
    this.template = html`
      <post-component create editable></post-component>
    `;
    this.requestUpdate();
  }

  edit(id: string) {
    this.template = html`
      <post-component editable id="${id}"></post-component>
    `;
    this.requestUpdate();
  }

  itemDeleted(item: any) {
    deleteDocument({ path: `posts/${item.id}` });
  }

  read(id: any) {
    return id && id != "undefined" ? this.readSingle(id) : this.readMulti();
  }

  readSingle(id: string) {
    this.template = html`
      <post-component id="${id}"></post-component>
    `;
    this.requestUpdate();
  }

  readMulti() {
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

  submitForm(e: any) {
    e.preventDefault();
    const data: any = {};
    data.title = this.shadowRoot.querySelector("[name='title']").value;
    data.author = this.shadowRoot.querySelector("[name='author']").value;
    data.content = this.shadowRoot.querySelector("[name='content']").value;
    this.addDocument({ path: "posts", data }).then((result: any) => {
      this.shadowRoot.querySelector(
        "#result"
      ).innerHTML = `Document created: ${result}. Waitng 2 seconds for a redirect to your post.`;
      setTimeout(
        () => this.store.dispatch(navigate(`/post/read/${result}`)),
        2000
      );
    });
  }

  render() {
    return html`
      <style>
        ${style}
      </style>
      ${this.template}
    `;
  }
}

window.customElements.define("post-controller", PostController);
