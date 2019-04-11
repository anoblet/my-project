import { LitElement, customElement } from "lit-element";

import { GoogleCharts } from "google-charts";
import { ResizeObserver } from "resize-observer";
import Template from "./Template";
import { properties } from "./Properties";
import { style } from "./Style";

@customElement("google-chart")
export class GoogleChart extends LitElement {
  public static styles = [style];
  public static properties = properties;
  public template = Template;
  public options: any;
  public data = [["Column 1", "Column 2"], ["name", 10]];
  public type = "bar";
  private _chart: any;

  public firstUpdated() {
    window.addEventListener("drawer-toggled", () => {
      this.draw();
    });
    // Resize observer
    const resizeObserver = new ResizeObserver((entries: any) => {
      this.draw();
    });
    resizeObserver.observe(this.shadowRoot.querySelector("#chart"));
    // Draw the chart
    this.draw();
  }

  public render() {
    return this.template.bind(this)();
  }

  public draw() {
    GoogleCharts.load(() => {
      const data = GoogleCharts.api.visualization.arrayToDataTable(this.data);
      this._chart = new GoogleCharts.api.visualization.ColumnChart(
        this.shadowRoot.querySelector("#chart")
      );
      this._chart.draw(data, this.options);
    });
  }
}
