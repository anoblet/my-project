import { LitElement, customElement, property } from "lit-element";
import Style from "./Style";
import Template from "./Template";
import Properties from "./Properties";
import { detectClickOutside } from "../../Utility";

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

  public boundEventListener;

  public constructor() {
    super();
    this.boundEventListener = this.onClick.bind(this);
  }

  public onClick(evt) {
    console.log("hi");
    console.log(evt.target);
    console.log(this);
    let targetElement: any = evt.target;
    do {
      if (targetElement == this) return;
      targetElement = targetElement.parentNode;
    } while (targetElement);
    this.close();
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
