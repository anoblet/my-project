import "@anoblet/markdown-component";

import { LitElement, customElement, html } from "lit-element";

import GlobalStyle from "../GlobalStyle";
import { applyStyle } from "@anoblet/utility/dist/utility";

@customElement("readme-component")
export class ReadmeComponent extends LitElement {
  firstUpdated() {
    applyStyle(
      this.shadowRoot.querySelector("markdown-component"),
      GlobalStyle
    );
  }

  public render() {
    return html`
      <markdown-component
        src="https://raw.githubusercontent.com/anoblet/my-project/master/README.md"
      ></markdown-component>
    `;
  }
}
