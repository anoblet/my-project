import { LitElement, customElement, property } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import Style from "./PostGridStyle";
import { getCollection } from "../../../packages/firebase-helpers";
import template from "./PostGridComponentTemplate";

@customElement("post-grid-component")
export class PostGridComponent extends LitElement {
  @property({ type: Array }) public items: any;

  public deleteItem(index: number) {
    const items = this.items;
    const item = items.splice(index, 1);
    this.items = [...items];
    this.dispatchEvent(
      new CustomEvent("item-deleted", {
        composed: true,
        detail: item[0]
      })
    );
  }

  public async beforeRender() {
    await getCollection({
      path: "posts"
    }).then((collection: any) => {
      this.items = collection;
    });
  }

  static get styles() {
    return [GlobalStyle, Style];
  }

  public render() {
    return template.bind(this)();
  }
}
