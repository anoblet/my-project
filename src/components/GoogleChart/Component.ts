import { LitElement, customElement } from "lit-element";

import { GoogleCharts } from "google-charts";
import Template from "./Template";
import { properties } from "./Properties";
import { store } from "../../Store";
import { style } from "./Style";

@customElement("google-chart")
export class GoogleChart extends LitElement {
  public static styles = [style];
  public static properties = properties;
  public template = Template;
  public options = {};
  public data = [];
  public type = "bar";

  public firstUpdated() {
    const state = store.getState();
    const theme = state.app.settings.theme;
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
