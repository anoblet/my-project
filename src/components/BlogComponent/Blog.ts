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
  @property() posts: any;

  connectedCallback() {
    super.connectedCallback();
    this.runTasks([
      new Promise(resolve => {
        getCollection({
          callback: (collection: any) => {
            this.posts = collection;
            resolve();
          },
          path: "posts",
          orderBy: "sortOrder",
          watch: true
        });
      })
    ]);
  }

  async beforeRender() {
    console.log("A");
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
