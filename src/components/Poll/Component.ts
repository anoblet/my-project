import { LitElement, customElement, property } from "lit-element";
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

  public createDialog() {
    const dialog: any = this.shadowRoot.querySelector("#create-dialog");
    dialog.open();
  }

  public save(e: any) {
    const form = this.shadowRoot.querySelector("#create");
    const inputs = form.querySelectorAll("input");
  }

  public addItem(e: any) {
    this.items = [...this.items, ""];
  }

  public removeItem(index: number) {
    const items = [...this.items];
    console.log(items);
    items.splice(index, 1);
    console.log(items);
    this.items = [...items];
    this.requestUpdate("items");
  }
}
