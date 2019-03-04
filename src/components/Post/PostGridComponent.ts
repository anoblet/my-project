import { LitElement, customElement, property } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import Style from "./PostGridStyle";
import {
  deleteDocument,
  getCollection
} from "../../Firebase";
import template from "./PostGridComponentTemplate";
import { toast } from "../Toast/Toast";

@customElement("post-grid-component")
export class PostGridComponent extends LitElement {
  @property({ type: Array }) public items: any;

  public deleteItem(index: number) {
    const items = this.items;
    const item = items.splice(index, 1)[0];
    deleteDocument({ path: `posts/${item.id}` })
      .then((result: any) => toast("Item deleted"))
      .catch((error: any) => toast("Missing or insufficient permissions"));
    this.items = [...items];
  }

  public async beforeRender() {
    await getCollection({
      path: "posts"
    }).then((collection: any) => (this.items = collection));
  }

  static get styles() {
    return [GlobalStyle, Style];
  }

  public render() {
    return template.bind(this)();
  }
}
