import { LitElement, customElement, property } from "lit-element";

import { BeforeRender } from "@anoblet/mixins";
import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";
import Template from "./Template";
import { getCollection } from "../../Firebase";

@customElement("blog-component")
export class Blog extends BeforeRender(LitElement) {
  public static styles = [GlobalStyle, Style];
  public render = Template.bind(this);

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
