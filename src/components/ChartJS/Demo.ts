import "./Component";

import { LitElement, customElement, html } from "lit-element";
import { until } from "lit-html/directives/until";

import { BeforeRender } from "../../mixins/BeforeRender";
import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";
import { populationByState } from "../CitySDK/CitySDK";

@customElement("demo-component")
export class Demo extends BeforeRender(LitElement) {
  public static styles = [GlobalStyle, Style];
  public data: any;

  public render() {
    return html`
      ${until(
        populationByState().then((_data) => {
          const labels = [];
          const values = [];
          _data.map((state: any) => {
            labels.push(state.name);
            values.push(state.population);
          });
          const data = { data: values, labels };
          return html`
            <chart-js .data=${data}></chart-js>
          `;
        }),
        html`
          Please wait for the data to load...
        `
      )}
    `;
  }
}
