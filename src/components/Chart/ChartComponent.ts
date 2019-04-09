// @ts-ignore-start
import { LitElement, css, customElement, html, property } from "lit-element";
import { store } from "../../Store";

// import GlobalStyle from "../../GlobalStyle";
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
    const state = store.getState();
    const theme = state.app.settings.theme;
    // @ts-ignore
    const data = GoogleCharts.api.visualization.arrayToDataTable(this.data);
    // @ts-ignore
    const chart = new GoogleCharts.api.visualization.BarChart(
      this.shadowRoot.getElementById("chart1")
    );
    const options = {
      backgroundColor: theme.backgroundColor,
      colors: [theme.primaryColor, theme.linkColor],
      legend: {
        textStyle: { color: theme.textColor }
      }
    };
    chart.draw(data, options);
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
    return [
      css`
        :host {
          color: #fff;
        }
      `
    ];
  }

  public render() {
    return html`
      <div id="chart1"></div>
    `;
  }
}
