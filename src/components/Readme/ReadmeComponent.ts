import { LitElement, customElement, html, property } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import Template from "./Template";
import { applyStyle } from "../../Utility";

@customElement("readme-component")
class Readme extends LitElement {
  public static styles = [GlobalStyle];
  @property() public path: string =
    "https://raw.githubusercontent.com/anoblet/my-project/master/README.md";
  @property() public html: string;

  public render = Template.bind(this);

  firstUpdated() {
    const markdown: any = this.renderRoot.querySelector("markdown-component")
    applyStyle(markdown, GlobalStyle);
  }
}
