// @ts-ignore-start
import { LitElement, customElement, html, property } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import { GoogleCharts } from "google-charts";
@customElement("chart-component")
export class ChartComponent extends LitElement {
  @property() public data: any = [
    ["Chart thing", "Chart amount"],
    ["Lorem ipsum", 60],
    ["Dolor sit", 22],
    ["Sit amet", 18]
  ];

  public draw() {
    // @ts-ignore
    const data = GoogleCharts.api.visualization.arrayToDataTable(this.data);
    // @ts-ignore
    const pie_1_chart = new GoogleCharts.api.visualization.PieChart(
      this.shadowRoot.getElementById("chart1")
    );
    pie_1_chart.draw(data);
  }

  public load() {
    GoogleCharts.load(() => this.draw());
  }

  public firstUpdated() {
    this.load();
  }

  public updated(changedProperties: any) {
    if (changedProperties.get("data")) this.load();
    super.updated(changedProperties);
  }

  static get styles() {
    return [GlobalStyle];
  }

  public render() {
    return html`
      <div id="chart1"></div>
    `;
  }
}
