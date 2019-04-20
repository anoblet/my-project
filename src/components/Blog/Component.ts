import { LitElement, customElement, property } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";
import Template from "./Template";
import { getCollection } from "../../Firebase";

@customElement("blog-component")
export class Blog extends LitElement {
  public static styles = [GlobalStyle, Style];
  public template = Template;
  public render() {
    return this.template.bind(this)();
  }

  @property() public posts: any = [];

  public async beforeRender() {
    this.posts = await getCollection({
      path: "posts",
      orderBy: "sortOrder",
      where: {
        property: "featured",
        operator: "===",
        value: true
      }
    });
  }
}
