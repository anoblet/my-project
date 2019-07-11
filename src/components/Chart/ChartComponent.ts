// @ts-ignore-start
import { LitElement, css, customElement, html, property } from "lit-element";
import { store } from "../../Store";

// import GlobalStyle from "../../GlobalStyle";
import { GoogleCharts } from "google-charts";

@customElement("chart-component")
export class ChartComponent extends LitElement {
  @property() public data: any;

  public draw() {
    const state = store.getState();
    const theme = state.app.settings.theme;
    const data = GoogleCharts.api.visualization.arrayToDataTable(this.data);
    const chart = new GoogleCharts.api.visualization.ColumnChart(
      this.shadowRoot.getElementById("chart")
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

  public static styles = [
    css`
      :host {
        display:flex;
        flex: 1;
      }
    `
  ];

  public render() {
    return html`
      <div id="chart"></div>
    `;
  }
}
