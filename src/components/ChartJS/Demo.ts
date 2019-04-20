import "./Component";

import { LitElement, css, customElement, html, property } from "lit-element";
import { until } from "lit-html/directives/until";

import { BeforeRender } from "../../mixins/BeforeRender";
import { populationByState } from "../CitySDK/CitySDK";
import MaterialColor from "random-material-color";

@customElement("demo-component")
export class Demo extends BeforeRender(LitElement) {
  public static styles = [
    css`
      :host {
        flex: 1;
      }

      ::part(content-container) {
        overflow-x: hidden;
      }
    `
  ];
  @property() public vintage: string = "2017";

  public render() {
    return html`
      <card-component>
        <div slot="title">Population by state</div>
        <input
          value=${this.vintage}
          @input=${(e: any) => {
            this.vintage = e.target.value;
          }}
        />
        ${until(
          populationByState(this.vintage).then((_data: any) => {
            const labels = [];
            const values = [];
            _data.map((state: any) => {
              labels.push(state.name);
              values.push(state.population);
            });
            const colors = [];
            labels.map(() => colors.push(MaterialColor.getColor()));
            const data = { data: values, labels, backgroundColor: colors };
            return html`
              <chart-js .data=${data}></chart-js>
            `;
          }),
          html`
            Please wait for the data to load...
          `
        )}
      </card-component>
    `;
  }
}
