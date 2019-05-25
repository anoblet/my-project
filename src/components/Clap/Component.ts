import { LitElement, customElement, property} from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";
import Template from "./Template";

@customElement("component-clap")
export class Clap extends LitElement {
  public static styles = [GlobalStyle, Style];
  public template = Template;
  public render = this.template.bind(this);

  @property({ type: Number }) public count = 0;
}
