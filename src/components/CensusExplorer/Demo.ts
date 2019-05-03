import { LitElement, css, customElement, html, property } from "lit-element";
import { until } from "lit-html/directives/until";

import { BeforeRender } from "../../mixins/BeforeRender";
import GlobalStyle from "../../GlobalStyle";
import {
  getPrograms,
  getVintages,
  populationByState
} from "../CitySDK/CitySDK";
import MaterialColor from "random-material-color";

import "../ChartJS/Component";

@customElement("census-explorer")
export class Demo extends BeforeRender(LitElement) {
  public static styles = [
    GlobalStyle,
    css`
      :host {
        flex: 1;
      }

      ::part(content-container) {
        overflow-x: hidden;
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
  @property() public vintages: any;
  @property() public type: string = "bar";
  @property() public values: string = "B00001_001E";

  public async beforeRender() {
    this.vintages = await getVintages();
    return;
  }

  public render() {
    return html`
      <card-component>
        <h3 slot="title">Field by state</h3>
        <grid-component id="options">
          <div class="field">
            <label>Vintage</label>
            <select name="vintage" @change=${this.handleChange}>
              ${this.vintages.map(
                vintage => html`
                  <option value=${vintage}>${vintage}</option>
                `
              )}
            </select>
          </div>
          <div class="field">
            <label>Program</label>
            <select name="vintage" @change=${this.handleChange}>
              ${until(getPrograms(this.vintage), html``)}
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
            <select name="values" @change=${this.handleChange}>
              <option value="B01001_001E">Population</option>
              <option value="B01001_002E">Sex by age</option>
            </select>
          </div>
        </grid-component>
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
