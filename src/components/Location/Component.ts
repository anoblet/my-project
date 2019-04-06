import { LitElement, customElement, html, property } from "lit-element";

import Template from "./Template";
import Style from "./Style";
import GlobalStyle from "../../GlobalStyle";

import { state } from "../../State";
import { store } from "../../Store";

@customElement("location-component")
export class Location extends LitElement {
  @property() public latitude: string;
  @property() public location: { latitude?: string; longitude?: string };
  @property() public longitude: string;
  @property() public temperature: string;

  static get styles() {
    return [GlobalStyle, Style];
  }

  public render() {
    return Template.bind(this)();
  }
}
