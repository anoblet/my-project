import { LitElement, css, customElement, html, property } from "lit-element";

import GlobalStyle from "../../src/GlobalStyle";
import pell from "pell";

@customElement("pell-component")
export class PellComponent extends LitElement {
  @property() public input: string;
  @property() public value: string;
  static get styles() {
    return [
      GlobalStyle,
      css`
        button {
          background: inherit;
          border: 0;
          color: var(--primary-color);
          padding: 0.75em;
        }
        .pell-actionbar {
          margin-top: 1em;
          width: fit-content;
        }
        .pell-content {
          min-height: 128px;
          margin-top: 1em;
          border: 1px solid var(--border-color);
          padding: 1em;
        }
      `
    ];
  }

  public updated(changedProperties: any) {
    const editor: any = this.shadowRoot.querySelector("#editor");
    if (changedProperties.get("input")) {
      editor.content.innerHTML = this.input;
    }
  }

  public firstUpdated() {
    const editor: any = this.shadowRoot.querySelector("#editor");
    pell.init({
      element: editor,
      onChange: (_html: any) => (this.value = _html),
      defaultParagraphSeparator: "div",
      styleWithCSS: false,
      classes: {
        actionbar: "pell-actionbar",
        button: "pell-button",
        content: "pell-content",
        selected: "pell-button-selected"
      }
    });
    if (this.input) editor.content.innerHTML = this.input;
    this.value = this.input;
  }

  public render() {
    return html`
      <div id="editor"></div>
    `;
  }
}
