import { css, customElement, html, LitElement, property } from "lit-element";
import { BaseElement } from "../../BaseElement";
import * as style from "./Blog.scss";
import template from "./BlogTemplate";
import { getCollection } from "../../../packages/firebase-helpers";
import { connect } from "pwa-helpers/connect-mixin.js";
import { Mixin } from "../../../packages/Mixin";
import { StateMixin } from "../../../packages/StateMixin";
import { TaskMixin } from "../../../packages/TaskMixin";
import { store } from "../../Store";
import("@material/mwc-icon");
// import style from "./BlogStyle";

// @customElement("blog-component")
export class Blog extends Mixin(connect(store)(BaseElement), [
  StateMixin,
  TaskMixin
]) {
  @property() loaded: any;
  @property() posts: any;

  constructor() {
    super();
    getCollection({
      callback: (collection: any) => {
        this.posts = collection;
        this.loaded = true;
      },
      path: "posts",
      orderBy: "sortOrder",
      watch: true
    });
  }

  shouldUpdate(changedProperties: any) {
    if (!this.loaded) return false;
    else return super.shouldUpdate(changedProperties);
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
