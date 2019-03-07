import { LitElement, customElement, html, property } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import { getCollection } from "../../Firebase";

@customElement("collection-list")
export class Collection extends LitElement {
  @property() public beforeRenderComplete: boolean;
  @property() public collection: any;
  @property() public orderBy: any = "sortOrder";
  @property() public path: string = "/posts";

  constructor() {
    super();
    this.beforeRenderComplete = false;
    this.beforeRender().then(() => (this.beforeRenderComplete = true));
  }

  public async beforeRender() {
    await getCollection({
      orderBy: this.orderBy,
      path: this.path
    }).then((collection: any) => {
      this.collection = collection;
    });
  }

  public shouldUpdate(changedProperties: any) {
    return this.beforeRenderComplete && super.shouldUpdate(changedProperties);
  }

  public itemRenderer(item: any) {
    return html`
      <card-component>
        ${JSON.stringify(item)}
      </card-component>
    `;
  }

  static get styles() {
    return [GlobalStyle];
  }

  public render() {
    return html`
      ${this.collection.map((item: any) => this.itemRenderer(item))}
    `;
  }
}
