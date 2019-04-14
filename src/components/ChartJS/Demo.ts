import "./Component";

import { LitElement, customElement, html } from "lit-element";

import { BeforeRender } from "../../mixins/BeforeRender";
import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";
import { populationByState } from "../CitySDK/CitySDK";

@customElement("demo-component")
export class Demo extends BeforeRender(LitElement) {
  public data: any;
  public static styles = [GlobalStyle, Style];

  public async beforeRender() {
    this.data = await populationByState();
  }

  public render() {
    const labels = [];
    const values = [];
    this.data.map((state: any) => {
      labels.push(state.name);
      values.push(state.population);
    });
    const data = { data: values, labels };
    return html`
      <chart-js .data=${data}></chart-js>
    `;
  }
}
