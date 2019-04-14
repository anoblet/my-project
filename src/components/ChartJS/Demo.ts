import { LitElement, customElement, html } from "lit-element";

import { populationByState } from "../CitySDK/CitySDK";
import { until } from "lit-html/directives/until";
import "./Component";

@customElement("demo-component")
export class Demo extends LitElement {
  public render() {
    return html`
      ${until(
        populationByState().then((result: any) => {
          const labels = [];
          const values = [];
          result.map((state: any) => {
            labels.push(state.name);
            values.push(state.population);
          });
          const data = { data: values, labels };
          return html`
            <chart-js .data=${data}></chart-js>
          `;
        }),
        html`
          Please be patient while the data is being loaded
        `
      )}
    `;
  }
}
