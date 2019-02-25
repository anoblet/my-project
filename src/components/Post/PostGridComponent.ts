import { LitElement, customElement, property } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import Style from "./PostGridStyle";
import {
  deleteDocument,
  getCollection
} from "../../../packages/firebase-helpers";
import template from "./PostGridComponentTemplate";
import { toast } from "../Toast/Toast";

@customElement("post-grid-component")
export class PostGridComponent extends LitElement {
  @property({ type: Array }) public items: any;

  public deleteItem(index: number) {
    const items = this.items;
    const item = items.splice(index, 1);
    this.items = [...items];
    console.log(index);
    console.log(item.id);
    deleteDocument({ path: `posts/${item.id}` })
      .then((result: any) => {
        console.log(result);
        toast("Item deleted");
      })
      .catch((error: any) => toast("Missing or insufficient permission"));
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
