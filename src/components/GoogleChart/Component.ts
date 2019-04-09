import { LitElement, css, customElement } from "lit-element";

import { GoogleCharts } from "google-charts";
import { style } from "./Style";
import Template from "./Template";
import { properties } from "./Properties";

@customElement("google-chart")
export class GoogleChart extends LitElement {
  public static styles = [style];
  public static properties = properties;
  public template = Template;

  public render() {
    return this.template.bind(this)();
  }
}
