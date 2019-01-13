import { css, customElement, html, LitElement } from "lit-element";
import { exec, init } from "pell/src/pell.js";

@customElement("pell-component")
export class PellComponent extends LitElement {
  static get styles() {
    return [
      css`
        :host: {
        }
      `
    ];
  }

  firstUpdated() {
    console.log(this.shadowRoot.querySelector("#editor"));
    init({
      element: this.shadowRoot.querySelector("#editor"),

      // <Function>, required
      // Use the output html, triggered by element's `oninput` event
      onChange: (html: any) => console.log(html),

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
      actions: [
        "bold",
        {
          name: "custom",
          icon: "C",
          title: "Custom Action",
          result: () => console.log("Do something!")
        },
        "underline"
      ],

      // classes<Array[string]> (optional)
      // Choose your custom class names
      classes: {
        actionbar: "pell-actionbar",
        button: "pell-button",
        content: "pell-content",
        selected: "pell-button-selected"
      }
    });
  }

  public render() {
    return html`
      <style></style>
      <div id="editor"></div>
    `;
  }
}
