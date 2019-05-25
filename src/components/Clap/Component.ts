import { LitElement, customElement, property} from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";
import Template from "./Template";

@customElement("component-clap")
export class Clap extends LitElement {
  public static styles = [GlobalStyle, Style];
  public template = Template;
  public render = this.template.bind(this);

  @property({ type: Array }) public items = ["Sample option #1", "Sample option #2"];
  @property({ type: Array }) public title = "Sample title";
  @property({ type: Array }) public polls = [];
}
