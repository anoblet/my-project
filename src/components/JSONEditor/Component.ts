import { LitElement, customElement } from "lit-element";

import Style from "./Style";
import Template from "./Template";

import JSONEditor from "jsoneditor";

@customElement("json-editor")
export class JSONEditorComponent extends LitElement {
  public static styles = [Style];
  public template = Template;
  public render = this.template.bind(this)();

  public editor: JSONEditor;
  public options: {};
  public json: {};

  public firstUpdated() {
    const container = this.shadowRoot.querySelector("#jsoneditor");
    this.editor = new JSONEditor(container, this.options);
    this.editor.set(this.json);
  }

  public get() {
    this.editor.get();
  }
}
