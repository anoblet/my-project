import { LitElement, customElement } from "lit-element";

import Chart from "chart.js";
import GlobalStyle from "../../GlobalStyle";
import { ResizeObserver } from "resize-observer";
import Style from "./Style";
import Template from "./Template";
import { populationByState } from "../CitySDK/CitySDK";

@customElement("chart-js")
export class ChartJS extends LitElement {
  public data: any;
  public chart: Chart;
  public static styles = [GlobalStyle, Style];

  public render() {
    return Template.bind(this)();
  }

  public firstUpdated() {
    this.createChart();
    this.observeResize();
  }

  public async getData() {
    const _data = await populationByState();
    const labels = [];
    const data = [];
    _data.map((state: any) => {
      labels.push(state.name);
      data.push(state.population);
    });
    return { labels, data };
  }

  public async createChart() {
    const { data, labels } = await this.getData();
    const chart: any = this.shadowRoot.querySelector("#myChart");
    const ctx = chart.getContext("2d");
    this.chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Population",
            data,
            backgroundColor: "rgba(255, 99, 132, 1)",
            borderColor: "rgba(255, 159, 64, 1)",
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        },
        maintainAspectRatio: false,
        aspectRatio: 1
      }
    });
  }

  public observeResize() {
    const resizeObserver = new ResizeObserver(() => {
      if (this.chart) this.chart.resize();
    });
    resizeObserver.observe(this.shadowRoot.querySelector("#container"));
  }
}
