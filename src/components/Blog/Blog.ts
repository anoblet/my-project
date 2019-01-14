import { html, LitElement, customElement } from "lit-element";
import * as style from "./Blog.scss";
import Template from "./BlogTemplate";
import { getCollection } from "../../../packages/firebase-helpers";
import("../../../packages/Quill/QuillDisplay");
import { connect } from "pwa-helpers/connect-mixin.js";
import { Mixin } from "../../../packages/Mixin";
import { StateMixin } from "../../../packages/StateMixin";
import { store } from "../../store.js";

// @customElement("blog-component")
export class Blog extends Mixin(connect(store)(LitElement), [StateMixin]) {
  async getPosts() {
    return await getCollection("posts");
  }

  public render() {
    return html`
      <style>
        ${style}
      </style>
      ${Template.bind(this)()}
    `;
  }
}

window.customElements.define("blog-component", Blog);
