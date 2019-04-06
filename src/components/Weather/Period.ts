import { LitElement, css, customElement, html, property } from "lit-element";
import GlobalStyle from "../../GlobalStyle";

@customElement("period-component")
export class Period extends LitElement {
  @property() public temperature: string;
  @property() public temperatureUnit: string;
  @property() public windDirection: string;
  @property() public windSpeed: string;

  static get styles() {
    return [GlobalStyle, css``];
  }

  public render() {
    return html``;
  }
}

export const summary = (position: any) => html`
  <grid-component> <span>label</span><span>value</span> </grid-component>
`;
