import { LitElement, customElement, html, property } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import { getCollection } from "../../Firebase";

@customElement("collection-list")
export class Collection extends LitElement {
  @property() public beforeRenderComplete: boolean;
  @property() public collection: any;
  @property() public path: string;

  constructor() {
    super();
    this.beforeRenderComplete = false;
    this.beforeRender().then(() => (this.beforeRenderComplete = true));
  }

  public async beforeRender() {
    await getCollection({
      path: this.path,
      orderBy: "sortOrder"
    }).then((collection: any) => {
      this.collection = collection;
    });
  }

  public shouldUpdate(changedProperties: any) {
    return !this.beforeRenderComplete && super.shouldUpdate(changedProperties);
  }

  static get styles() {
    return [GlobalStyle];
  }

  public render() {
    throw Error("Please define a render prop");
  }
}
