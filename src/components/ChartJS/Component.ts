import { LitElement, customElement } from "lit-element";

import Chart from "chart.js";
import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";
import Template from "./Template";

@customElement("chart-js")
export class ChartJS extends LitElement {
  public static styles = [GlobalStyle, Style];

  public render() {
    return Template.bind(this)();
  }
}
