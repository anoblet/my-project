import { LitElement, customElement, html, property } from "lit-element";

import { getCollection } from "../../../packages/firebase-helpers";
import GlobalStyle from "../../GlobalStyle";
import Style from "./BlogStyle";
import Template from "./BlogTemplate";
import "../LoadingComponent";

@customElement("blog-component")
export class Blog extends LitElement {
  @property() public taskPending = true;
  @property() public posts: any = [];

  public async beforeRender() {
    await getCollection({
      path: "posts",
      orderBy: "sortOrder",
      where: {
        property: "featured",
        operator: "===",
        value: true
      }
    }).then((collection: any) => {
      this.posts = collection;
      this.taskPending = false;
    });
  }

  public shouldUpdate(changedProperties: any) {
    return !this.taskPending && super.shouldUpdate(changedProperties);
  }

  static get styles() {
    return [GlobalStyle, Style];
  }

  public render() {
    return Template.bind(this)();
  }
}

// window.customElements.define("blog-component", Blog);
