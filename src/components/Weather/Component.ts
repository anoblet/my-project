import { LitElement, customElement } from "lit-element";

import Template from "./Template";
import Style from "./Style";
import GlobalStyle from "../../GlobalStyle";

import { getLocation } from "../../Location";

@customElement("weather-component")
export class Component extends LitElement {
  static get styles() {
    return [GlobalStyle, Style];
  }

  public render() {
    return Template.bind(this)();
  }

  public getLocation() {
    return getLocation();
  }
}
