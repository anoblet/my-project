import "@vaadin/vaadin-grid/theme/material/vaadin-grid.js";
import "@vaadin/vaadin-grid/theme/material/vaadin-grid-filter-column.js";
import "@vaadin/vaadin-text-field/theme/material/vaadin-text-field.js";
import "@vaadin/vaadin-text-field/theme/material/vaadin-text-area.js";
import "@vaadin/vaadin-form-layout/theme/material/vaadin-form-layout.js";
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
import { store } from "../store.js";
import { until } from "lit-html/directives/until";

const serialize = require("form-serialize");

const navigation = html`
  <a href="/post/create"><mwc-button outlined>Create</mwc-button></a>
  <a href="/post/read"><mwc-button outlined>Read</mwc-button></a>
  <a href="/post/edit"><mwc-button outlined>Update</mwc-button></a>
  <a href="/post/delete"><mwc-button outlined>Delete</mwc-button></a>
`;

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
    this.addEventListener("item-deleted", (e: any) =>
      this.itemDeleted(e.detail)
    );
    this.setStore(store);
    if (this[this.action]) this[this.action](this.id);
  }

  firstUpdated() {
    if (super.firstUpdated) {
      super.firstUpdated();
    }

    if (this.action == "index") {
      store.dispatch(navigate("/post/read"));
    } else {
      if (this.action) this[this.action]();
      else store.dispatch(navigate("/post"));
    }
  }

  create() {
    const post = new Post();
    this._template = html`
      <form>
        <vaadin-form-layout>
        ${post.fields.map(
          (field: any) =>
            html`
              ${
                field.type == "text"
                  ? html`
                      <vaadin-text-field
                        name="${field.name}"
                        label="${field.label}"
                      ></vaadin-text-field>
                    `
                  : ""
              }
              ${
                field.type == "textarea"
                  ? html`
                      <vaadin-text-area
                        colspan="2"
                        name="${field.name}"
                        label="${field.label}"
                      ></vaadin-text-area>
                    `
                  : ""
              }
            `
        )}
        <vaadin-form-layout>
        <button
          @click="${(e: Event) => {
            e.preventDefault();
            // const form = this.shadowRoot.querySelector("form");
            // const data = serialize(form, { hash: true });
            const data: any = {};
            data.title = this.shadowRoot.querySelector("[name='title']").value;
            data.author = this.shadowRoot.querySelector(
              "[name='author']"
            ).value;
            data.content = this.shadowRoot.querySelector(
              "[name='content']"
            ).value;
            this.addDocument({ path: "posts", data });
          }}"
        >
          Submit
        </button>
      </form>
    `;
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
    if (id) {
      this._template = this.readSingle(id);
    } else {
      this._template = this.getCollection({ path: "posts", watch: true }).then(
        (collection: any) => {
          return html`
            <post-grid-component .items="${collection}"></post-grid-component>
          `;
        }
      );
    }
  }

  readSingle(id: string) {
    return this.getAppDocument(`posts/${id}`).then(
      ({ author, content }: any) => {
        return html`
          <post-component
            id="${id}"
            author="${author}"
            content="${content}"
          ></post-component>
        `;
      }
    );
  }

  render() {
    return html`
      <style>
        ${style}
      </style>
      <div id="navigation">${navigation}</div>
      ${until(this._template, "")}
    `;
  }
}

window.customElements.define("post-controller", PostController);
