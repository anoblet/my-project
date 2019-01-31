import { css, customElement, html, LitElement, property } from "lit-element";
// import { exec, init } from "pell/src/pell";
// import * as pell from "pell";
// import { exec, init } from "pell";
const pell = require("pell");

import globalStyle from "../../src/GlobalStyle";

@customElement("pell-component")
export class PellComponent extends LitElement {
  @property() input: string;
  @property() value: string;
  static get styles() {
    return [
      globalStyle,
      css`
        button {
          background: inherit;
          border: 0;
          color: var(--primary-color);
          padding: 0.75em;
        }
        .pell-actionbar {
          margin-top: 1em;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
          width: fit-content;
        }
        .pell-content {
          margin-top: 1em;
          min-height: 128px;
          border: 1px solid var(--border-color);
        }
      `
    ];
  }

  updated(changedProperties: any) {
    const editor: any = this.shadowRoot.querySelector("#editor");
    if (changedProperties.get("input")) {
      editor.content.innerHTML = this.input;
    }
  }

  firstUpdated() {
    const editor: any = this.shadowRoot.querySelector("#editor");
    pell.init({
      element: editor,
      onChange: (html: any) => (this.value = html),
      // <string>, optional, default = 'div'
      // Instructs the editor which element to inject via the return key
      defaultParagraphSeparator: "div",
      // <boolean>, optional, default = false
      // Outputs <span style="font-weight: bold;"></span> instead of <b></b>
      styleWithCSS: false,
      // <Array[string | Object]>, string if overwriting, object if customizing/creating
      // action.name<string> (only required if overwriting)
      // action.icon<string> (optional if overwriting, required if custom action)
      // action.title<string> (optional)
      // action.result<Function> (required)
      // Specify the actions you specifically want (in order)
      actions: ["bold", "link", "olist", "ulist", "underline"],

      // classes<Array[string]> (optional)
      // Choose your custom class names
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
