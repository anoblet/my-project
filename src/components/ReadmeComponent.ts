import { LitElement, customElement, html, query } from "lit-element";

import GlobalStyle from "../GlobalStyle";
import { applyStyle } from "@anoblet/utility/dist/utility";

@customElement("readme-component")
export class ReadmeComponent extends LitElement {
  @query("markdown-component") markdown;

  firstUpdated() {
    applyStyle(this.markdown, GlobalStyle);
  }

  public render() {
    return html`
      <markdown-component
        src="https://raw.githubusercontent.com/anoblet/my-project/master/README.md"
        .inheritedStyles=${GlobalStyle}
      ></markdown-component>
    `;
  }
}
