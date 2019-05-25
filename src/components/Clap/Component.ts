import { LitElement, customElement, property } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";
import Template from "./Template";

@customElement("component-clap")
export class Clap extends LitElement {
  public static styles = [GlobalStyle, Style];
  public template = Template;
  public render = this.template.bind(this);

  @property({ type: Number }) public count = 0;

  public clap() {
    this.count++;
    this.dispatchEvent(new CustomEvent("count-changed", {
      detail: {
        count: this.count
      }
    }));
  }
}
