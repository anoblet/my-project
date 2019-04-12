import { LitElement, customElement } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";
import Template from "./Template";

@customElement("chartjs-component")
export class ChartJS extends LitElement {
  public static styles = [GlobalStyle, Style];

  public render() {
    return Template.bind(this)();
  }
}
