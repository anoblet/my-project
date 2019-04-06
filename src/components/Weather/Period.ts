import { LitElement, css, customElement, html, property } from "lit-element";
import GlobalStyle from "../../GlobalStyle";

@customElement("period-component")
export class Location extends LitElement {
  @property() public latitude: string;
  @property() public location: { latitude?: string; longitude?: string };
  @property() public longitude: string;
  @property() public temperature: string;

  static get styles() {
    return [GlobalStyle, css``];
  }

  public render() {
    return html``;
  }
}
