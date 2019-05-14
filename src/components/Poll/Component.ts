import { LitElement, customElement, property, query } from "lit-element";
import Style from "./Style";
import Template from "./Template";
import Properties from "./Properties";

/**
 * Poll component
 */
@customElement("poll-component")
export class Component extends LitElement {
  public static properties = Properties;
  public static styles = Style;
  public template = Template;
  public render = this.template.bind(this);

  @property({ type: Array }) public items = ["test"];

  @query("#create-dialog") public dialog;

  public createDialog() {
    this.dialog.open();
  }

  public save(e: any) {
    const form = this.shadowRoot.querySelector("#create");
  }

  public addItem() {
    if (this.items[this.items.length - 1] !== "")
      this.items = [...this.items, ""];
  }

  public removeItem(index: number) {
    const items = [...this.items];
    items.splice(index, 1);
    this.items = [...items];
  }
}
