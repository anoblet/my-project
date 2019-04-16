import { LitElement, customElement } from "lit-element";

import Style from "./Style";
import Template from "./Template";

import JSONEditor from "jsoneditor";

@customElement("json-editor")
export class JSONEditorComponent extends LitElement {
  public static styles = [Style];
  public template = Template;

  public render() {
    return this.template.bind(this)();
  }

  public firstUpdated() {
    // create the editor
    const container = this.shadowRoot.getElementById("jsoneditor");
    const options = {
      theme: "bootstrap2"
    };
    const editor = new JSONEditor(container, options);

    // set json
    const _json = {
      Array: [1, 2, 3],
      Boolean: true,
      Null: null,
      Number: 123,
      Object: { a: "b", c: "d" },
      String: "Hello World"
    };
    editor.set(_json);

    // get json
    const json = editor.get();
  }
}
