import { css, html, LitElement, customElement } from "lit-element";
import * as style from "./Blog.scss";
import template from "./BlogTemplate";
import { getCollection } from "../../../packages/firebase-helpers";
// import("../../../packages/Quill/QuillDisplay");
import { connect } from "pwa-helpers/connect-mixin.js";
import { Mixin } from "../../../packages/Mixin";
import { StateMixin } from "../../../packages/StateMixin";
import { store } from "../../store";
import("@material/mwc-icon");
// import style from "./BlogStyle";

// @customElement("blog-component")
export class Blog extends Mixin(connect(store)(LitElement), [StateMixin]) {
  // static get styles() {
  //   const styles = style();
  //   return [styles];
  // }

  async getPosts() {
    return await getCollection({ path: "posts", orderBy: "sortOrder" });
  }

  public render() {
    return html`
      <style>
        ${style}
      </style>
      ${template.bind(this)()}
    `;
  }
}

window.customElements.define("blog-component", Blog);
