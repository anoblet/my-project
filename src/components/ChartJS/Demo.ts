import { LitElement, customElement, html } from "lit-element";

import { populationByState } from "../CitySDK/CitySDK";
import { until } from "lit-html/directives/until";

@customElement("demo-component")
export class Demo extends LitElement {
  public render() {
    return html`
      ${until(
        populationByState().then((data: any) => {
          const labels = [];
          const values = [];
          data.map((state: any) => {
            labels.push(state.name);
            values.push(state.population);
          });
          const _data =  { labels, values };
          return html`
            <chart-js .data=${_data}></chart-js>
          `;
        })
      )})
    `;
  }
}
