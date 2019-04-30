import "./Component";

import { LitElement, css, customElement, html, property } from "lit-element";
import { until } from "lit-html/directives/until";

import { BeforeRender } from "../../mixins/BeforeRender";
import { populationByState } from "../CitySDK/CitySDK";
import MaterialColor from "random-material-color";

import "../Ratio/Component";

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

      ratio-component {
        border: 0;
      }

      .field {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
      }

      #options {
        margin-bottom: 1em;
      }
    `
  ];
  @property() public vintage: string = "2017";
  @property() public type: string = "bar";
  @property() public values: string = "B00001_001E";

  public render() {
    return html`
      <card-component>
        <div slot="title">Field by state</div>
        <div id="options">
          <div class="field">
            <label>Vintage</label>
            <select name="vintage" @change=${this.handleChange}>
              <option value="2017">2017</option>
              <option value="2015">2015</option>
            </select>
          </div>
          <div class="field">
            <label>Type</label>
            <select name="type" @change=${this.handleChange}>
              <option value="bar">Bar</option>
              <option value="line">Line</option>
              <option value="pie">Pie</option>
              <option value="radar">Radar</option>
              <option value="doughnut">Doughnut</option>
            </select>
          </div>
          <div class="field">
            <label>Field</label>
            <select name="type" @change=${this.handleChange}>
              <option value="B01001_001E">Population</option>
            </select>
          </div>
        </div>
        ${until(
          populationByState(this.vintage, this.values).then((_data: any) => {
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
              <ratio-component ratio="1">
                <chart-js .data=${data} .type=${this.type}></chart-js>
              </ratio-component>
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
