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
  public _chart: HTMLElement;

  public firstUpdated() {
    this._chart = this.shadowRoot.querySelector("#chart");
    window.addEventListener("drawer-toggled", () => {
      this.draw();
    });
    window.addEventListener("resize", () => {
      console.log("resize");
      this.draw();
    });
    this.draw();
  }

  public render() {
    return this.template.bind(this)();
  }

  public draw() {
    GoogleCharts.load(() => {
      const chart = this.shadowRoot.querySelector("#chart");
      // this.shadowRoot.removeChild(chart);
      // const element = document.createElement("div");
      // element.setAttribute("id", "chart");
      // this.shadowRoot.appendChild(element);
      const data = GoogleCharts.api.visualization.arrayToDataTable(this.data);
      const chartContainer = new GoogleCharts.api.visualization.ColumnChart(
        chart
      );
      // setTimeout(() => chartContainer.draw(data, this.options), 0);
      chartContainer.draw(data, this.options);
    });
  }

  public observeResize() {
    const delay = 100;
    (() => {
      let timer = null;
      const resizeObserver = new ResizeObserver(() => {
        if (timer !== null) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          timer = null;
          this.draw();
        }, delay);
      });
      resizeObserver.observe(this);
    })();
  }

  public create() {
    return;
  }
}
