import { LitElement, css, customElement, html, property } from "lit-element";

import globalStyle from "../../src/GlobalStyle";
// @ts-ignore
import pell from "pell";

@customElement("pell-component")
export class PellComponent extends LitElement {
  @property() public input: string;
  @property() public value: string;
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
          /* display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr; */
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
