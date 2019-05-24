import { LitElement, customElement, property } from "lit-element";
import Style from "./Style";
import Template from "./Template";
import Properties from "./Properties";

/**
 * Dialog component
 */
@customElement("dialog-component")
export class Dialog extends LitElement {
  public static properties = Properties;
  public static styles = Style;
  public template = Template;
  public render = this.template.bind(this);

  @property({ type: Boolean, reflect: true })
  public hidden = true;

  public boundEventListener;

  public constructor() {
    super();
    this.boundEventListener = this.onClick.bind(this);
  }

  public onClick(e) {
    if (e.composedPath().indexOf(this) === -1) this.close();
  }

  public open() {
    this.hidden = false;
    setTimeout(
      () => document.addEventListener("click", this.boundEventListener),
      0
    );
  }

  public close() {
    this.hidden = true;
    document.removeEventListener("click", this.boundEventListener);
  }
}
