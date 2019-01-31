import { LitElement, customElement, property } from "lit-element";

import { BaseElement } from "../../BaseElement";
import { Mixin } from "../../../packages/Mixin";
import { StateMixin } from "../../../packages/StateMixin";
import { TaskMixin } from "../../../packages/TaskMixin";
import { connect } from "pwa-helpers/connect-mixin.js";
import { getCollection } from "../../../packages/firebase-helpers";
import globalStyle from "../../GlobalStyle";
import { store } from "../../Store";
import style from "./BlogStyle";
import template from "./BlogTemplate";

import("@material/mwc-icon");

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

  static get styles() {
    return [globalStyle, style];
  }

  public render() {
    return template.bind(this)();
  }
}

window.customElements.define("blog-component", Blog);
