import {
  LitElement,
  css,
  customElement,
  property,
  unsafeCSS
} from "lit-element";

import { BeforeRender } from "@anoblet/mixins";
import { getCollection } from "../../Firebase";
import globalStyle from "../../GlobalStyle";
import { post } from "./Types";
import template from "./Template";

const styleImport = require("./style.css");
const style = css`
  ${unsafeCSS(styleImport)}
`;

@customElement("blog-component")
export class Blog extends BeforeRender(LitElement) {
  public static styles = [globalStyle, style];
  public render = template.bind(this);

  @property() public posts: post[];

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
