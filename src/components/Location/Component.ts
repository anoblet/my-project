import { LitElement, customElement, property } from "lit-element";

import Template from "./Template";
import Style from "./Style";
import GlobalStyle from "../../GlobalStyle";

import { getPosition } from "./Lib";

@customElement("location-component")
export class Location extends LitElement {
  @property() public latitude: string;
  @property() public longitude: string;
  @property() public locationChanged: ({ latitude, longitude }) => any;

  static get styles() {
    return [GlobalStyle, Style];
  }

  public render() {
    return Template.bind(this)();
  }

  public updated(changedProperties: any) {
    if (changedProperties.has("latitude") || changedProperties.has("longitude"))
      this.locationChanged({
        latitude: this.latitude,
        longitude: this.longitude
      });
    return super.updated(changedProperties);
  }

  public latitudeChanged(e: any) {
    this.latitude = e.target.value;
  }

  public longitudeChanged(e: any) {
    this.longitude = e.target.value;
  }

  public getLocation(e: any) {
    getPosition((position: any) => {
      this.latitude = position.latitude;
      this.longitude = position.longitude;
    });
  }
}
