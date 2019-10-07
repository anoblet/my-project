import { LitElement, css, customElement, property, unsafeCSS } from "lit-element";

import { BeforeRender } from "@anoblet/mixins";
import GlobalStyle from "../../GlobalStyle";
import Template from "./Template";
import { getCollection } from "../../Firebase";

const styleImport = require("./style.css");
const style = css`
  ${unsafeCSS(styleImport)}
`;

@customElement("blog-component")
export class Blog extends BeforeRender(LitElement) {
  public static styles = [GlobalStyle, style];
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
