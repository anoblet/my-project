import "@anoblet/markdown-component";

import {
  LitElement,
  css,
  customElement,
  html,
  query,
  unsafeCSS
} from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import { applyStyle } from "@anoblet/utility";

const styleImport = require("./style.css");
const style = css`
  ${unsafeCSS(styleImport)}
`;

@customElement("readme-component")
export class ReadmeComponent extends LitElement {
  @query("markdown-component") markdown;

  public firstUpdated() {
    applyStyle(
      this.markdown,
      GlobalStyle
    );
    applyStyle(this.markdown, style);
  }

  public render() {
    return html`
      <markdown-component
        src="https://raw.githubusercontent.com/anoblet/my-project/master/README.md"
      ></markdown-component>
    `;
  }
}
