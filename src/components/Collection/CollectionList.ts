import { LitElement, customElement, property } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import { getCollection } from "../../../packages/firebase-helpers";

@customElement("collection-list-component")
export class Collection extends LitElement {
  @property() public posts: any = [];
  @property() public taskPending = true;

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
