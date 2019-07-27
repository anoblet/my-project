import { LitElement, customElement, html, property } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import Template from "./Template";
import { mdToHtml } from "../../../packages/Showdown/Showdown";
import { unsafeHTML } from "lit-html/directives/unsafe-html";

@customElement("readme-component")
class Readme extends LitElement {
  public static styles = [GlobalStyle];
  @property() public path: string =
    "https://raw.githubusercontent.com/anoblet/my-project/master/README.md";
  @property() public html: string;

  public async beforeRender() {
    const data = await fetch(this.path).then((response: any) =>
      response.text()
    );
    this.html = mdToHtml(data);
  }

  public render = Template.bind(this);

  firstUpdated() {
    const node: any = this.renderRoot.querySelector("markdown-component")
      .shadowRoot;
    node.adoptedStyleSheets = [GlobalStyle._styleSheet];
  }
}
