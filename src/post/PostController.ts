import("@vaadin/vaadin-grid/theme/material/vaadin-grid.js");
import("@vaadin/vaadin-grid/theme/material/vaadin-grid-filter-column.js");
import("@vaadin/vaadin-text-field/theme/material/vaadin-text-field.js");
import("@vaadin/vaadin-text-field/theme/material/vaadin-text-area.js");
import("@vaadin/vaadin-form-layout/theme/material/vaadin-form-layout.js");

import "./PostComponent";
import "./PostGridComponent";

import * as style from "./PostController.scss";

import { LitElement, html, property } from "@polymer/lit-element";

import { FirebaseMixin } from "../../packages/FirebaseMixin";
import { Mixin } from "../../packages/Mixin";
import { Post } from "./PostModel";
import { StateMixin } from "../../packages/StateMixin";
import { connect } from "pwa-helpers/connect-mixin.js";
import { navigate } from "lit-redux-router";
import navigation from "./NavigationTemplate";
import { store } from "../store.js";
import { until } from "lit-html/directives/until";

export interface PostController {
  [key: string]: any; // Add index signature
}

export class PostController extends Mixin(LitElement, [
  FirebaseMixin,
  StateMixin
]) {
  @property({ type: String }) action: string = "index";
  _template: any;

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    this.addEventListener("item-deleted", (e: any) =>
      this.itemDeleted(e.detail)
    );
    this.setStore(store);
  }

  firstUpdated() {
    if (super.firstUpdated) super.firstUpdated();
    if (this.action == "index") {
      store.dispatch(navigate("/post/read"));
    } else {
      if (this[this.action]) this[this.action](this.id);
      else store.dispatch(navigate("/post"));
    }
    if (this.action !== "read") this.requestUpdate();
  }

  create() {
    const post = new Post();
    this._template = import("./PostCreateTemplate").then((module: any) =>
      module.default.bind(this)(this)
    );
    this.requestUpdate();
  }

  edit() {
    this._template = html`
      In progress
    `;
  }

  itemDeleted(item: any) {
    this.deleteDocument({ path: `posts/${item.id}` });
  }

  read(id: any) {
    id ? this.readSingle(id) : this.readMulti();
  }

  readSingle(id: string) {
    this._template = this.getAppDocument(`posts/${id}`).then(
      ({ author, content, title }: any) => {
        return html`
          <post-component
            id="${id}"
            .author="${author}"
            .content="${content}"
            .title="${title}"
          ></post-component>
        `;
      }
    );
    this.requestUpdate();
  }

  readMulti() {
    const renderGrid = (collection: any) => {
      this._template = html`
        <post-grid-component .items="${collection}"></post-grid-component>
      `;
      this.requestUpdate();
    };

    this.getCollection({
      callback: renderGrid,
      path: "posts",
      watch: true
    });
  }

  render() {
    return html`
      <style>
        ${style}
      </style>
      <div id="navigation">${navigation()}</div>
      ${until(this._template, "")}
    `;
  }
}

window.customElements.define("post-controller", PostController);
