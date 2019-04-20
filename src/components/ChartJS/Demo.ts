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
  @property() public type: string = "bar";

  public render() {
    return html`
      <card-component>
        <div slot="title">Population by state</div>
        <select name="vintage" @change=${this.handleChange}>
          <option value="2017">2017</option>
          <option value="2015">2015</option>
        </select>
        <select name="type" @change=${this.handleChange}>
          <option value="bar">Bar</option>
          <option value="line">Line</option>
          <option value="pie">Pie</option>
          <option value="radar">Radar</option>
          <option value="doughnut">Doughnut</option>
        </select>
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
              <chart-js .data=${data} .type=${this.type}></chart-js>
            `;
          }),
          html`
            Please wait for the data to load...
          `
        )}
      </card-component>
    `;
  }

  public handleChange(e: any) {
    this[e.target.name] = e.target.value;
  }
}
