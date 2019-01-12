import { html, LitElement, customElement } from "lit-element";
import * as style from "./Blog.scss";
import Template from "./BlogTemplate";

import "../../components/CollectionList/CollectionList";

@customElement("blog-component")
export class Blog extends LitElement {
  getPosts() {}

  public render() {
    return html`
      <style>
        ${style}
      </style>
      ${Template.bind(this)()}
    `;
  }
}
