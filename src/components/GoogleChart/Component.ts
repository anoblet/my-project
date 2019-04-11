import { LitElement, customElement, query } from "lit-element";

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
  // @query("#chart") public _chart: any;
  public _chart: HTMLElement;

  public firstUpdated() {
    this._chart = this.shadowRoot.querySelector("#chart");
    window.addEventListener("drawer-toggled", () => {
      this.draw();
    });
    // Resize observer
    const resizeObserver = new ResizeObserver(() => {
      this.draw();
    });
    resizeObserver.observe(this);
    // Draw the chart
    this.draw();
  }

  public render() {
    return this.template.bind(this)();
  }

  public draw() {
    GoogleCharts.load(() => {
      const _chart = this.shadowRoot.querySelector("#chart");
      this.shadowRoot.removeChild(_chart);
      const div = document.createElement("div");
      div.setAttribute("id", "chart");
      this.shadowRoot.appendChild(div);
      const data = GoogleCharts.api.visualization.arrayToDataTable(this.data);
      const chart = new GoogleCharts.api.visualization.ColumnChart(div);
      chart.draw(data, this.options);
    });
  }
}
