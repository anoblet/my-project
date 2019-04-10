import { LitElement, customElement } from "lit-element";

import { GoogleCharts } from "google-charts";
import Template from "./Template";
import { properties } from "./Properties";
import { style } from "./Style";

@customElement("google-chart")
export class GoogleChart extends LitElement {
  public static styles = [style];
  public static properties = properties;
  public template = Template;
  public options: any;
  public data = [
    ["Column 1", "Column 2"],
    ["name", 10],
    ["name", 10],
    ["name", 10],
    ["name", 10]
  ];
  public type = "bar";

  public firstUpdated() {
    console.log(this.options);
    GoogleCharts.load(() => {
      const data = GoogleCharts.api.visualization.arrayToDataTable(this.data);
      const chart = new GoogleCharts.api.visualization.ColumnChart(
        this.shadowRoot.getElementById("chart")
      );
      chart.draw(data, this.options);
    });
  }

  public render() {
    return this.template.bind(this)();
  }
}
