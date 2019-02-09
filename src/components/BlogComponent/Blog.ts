import { LitElement, customElement, property } from "lit-element";

import { BaseElement } from "../../BaseElement";
import { Mixin } from "../../../packages/Mixin";
import { getCollection } from "../../../packages/firebase-helpers";
import globalStyle from "../../GlobalStyle";
import style from "./BlogStyle";
import template from "./BlogTemplate";

// @customElement("blog-component")
export class Blog extends Mixin(BaseElement, [
]) {
  @property({ reflect: true, attribute: "task-pending"}) public taskPending = true;
  @property() public posts: any = [];

  constructor() {
    super();
    getCollection({
      callback: (collection: any) => {
        this.posts = collection;
        this.taskPending = false;
      },
      path: "posts",
      orderBy: "sortOrder",
      watch: true,
      where: {
        property: "featured",
        operator: "===",
        value: true
      }
    });
  }

  public shouldUpdate(changedProperties: any) {
    if (this.taskPending) return false;
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
