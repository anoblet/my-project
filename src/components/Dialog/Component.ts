import { LitElement, customElement, property } from "lit-element";
import Style from "./Style";
import Template from "./Template";
import Properties from "./Properties";

/**
 * Dialog component
 */
@customElement("dialog-component")
export class DialogComponent extends LitElement {
  public static properties = Properties;
  public static styles = Style;
  public template = Template;
  public render = this.template.bind(this);

  @property({ type: Boolean, reflect: true })
  public hidden = true;

  public open() {
    this.hidden = false;
  }

  public close() {
    this.hidden = true;
  }
}
