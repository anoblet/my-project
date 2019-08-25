import { LitElement, css, customElement, html, property } from "lit-element";
import { until } from "lit-html/directives/until";

import { BeforeRender } from "@anoblet/mixins";
import GlobalStyle from "../../GlobalStyle";
import {
  getPrograms,
  getVintages,
  populationByState
} from "../CitySDK/CitySDK";
import MaterialColor from "random-material-color";

import "../ChartJS/Component";

const getStructure = async () => {
  const result: any = await fetch("https://api.census.gov/data/").then(function(
    response
  ) {
    return response.json();
  });
  const unsortedArray = [];
  result.dataset.map((data: any) => {
    const vintage = data["c_vintage"];
    if (vintage && !unsortedArray.includes(vintage))
      unsortedArray.push(vintage);
  });
  return unsortedArray.sort((a, b) => a - b);
};

const Style = css`
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
`;

@customElement("census-explorer-demo")
export class Demo extends BeforeRender(LitElement) {
  public static styles = [GlobalStyle, Style];
  @property() public vintage: string = "2017";
  @property() public vintages: any;
  @property() public type: string = "bar";
  @property() public values: string = "B00001_001E";

  /**
   * This should grab the default chart
   * @return [description]
   */
  public async getInitialData() {
    // const structure = await getStructure();
    this.vintages = await getVintages();
    // const programs = await getPrograms();
    // console.log(programs);
  }

  connectedCallback() {
    super.connectedCallback();
    // this.getInitialData();
    console.log("2");
  }

  public async beforeRender() {
    console.log("1");
    await this.getInitialData();
  }

  public render() {
    return html`
      <card-component>
        <h3 slot="title">Field by state</h3>
        <grid-component id="options">
          <div class="field">
            <label>Vintage</label>
            <select name="vintage" @change=${this.handleChange}>
              ${this.vintages
                ? this.vintages.map(
                    vintage => html`
                      <option
                        value=${vintage}
                        ?selected=${vintage == this.vintage}
                        >${vintage}</option
                      >
                    `
                  )
                : ""}
            </select>
          </div>
          <div class="field">
            <label>Program</label>
            <select name="vintage" @change=${this.handleChange}>
              ${until(
                getPrograms(this.vintage).then(programs =>
                  programs.map(
                    program =>
                      html`
                        <option>${program}</option>
                      `
                  )
                )
              )}
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
