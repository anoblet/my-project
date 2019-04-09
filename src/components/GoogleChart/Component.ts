import { LitElement, css, customElement } from "lit-element";

import { GoogleCharts } from "google-charts";
import { style } from "./Style";
import Template from "./Template";
import { properties } from "./Properties";

@customElement("google-chart")
export class GoogleChart extends LitElement {
  public template = Template;
  public static properties = properties;
  public static styles = [style];

  public render() {
    return this.template.bind(this)();
  }
}
