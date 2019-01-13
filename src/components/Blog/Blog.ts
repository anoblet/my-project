import { html, LitElement, customElement } from "lit-element";
import * as style from "./Blog.scss";
import Template from "./BlogTemplate";
import { getCollection } from "../../../packages/firebase-helpers";
import("../../../packages/Quill/QuillDisplay");

@customElement("blog-component")
export class Blog extends LitElement {
  async getPosts() {
    return await getCollection("posts");
  }

  public render() {
    return html`
      <style>
        ${style}
      </style>
      ${Template.bind(this)()}
    `;
  }
}
