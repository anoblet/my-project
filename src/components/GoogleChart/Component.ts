import { LitElement, css, customElement } from "lit-element";

import { GoogleCharts } from "google-charts";
import Template from "./Template";
import { properties } from "./Properties";
import { style } from "./Style";

@customElement("google-chart")
export class GoogleChart extends LitElement {
  public static styles = [style];
  public static properties = properties;
  public template = Template;

  public constructor() {
    super();
  }

  public render() {
    return this.template.bind(this)();
  }
}
