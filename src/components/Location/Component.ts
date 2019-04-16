import { LitElement, customElement, property } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";
import Template from "./Template";
import { getPosition } from "./Lib";

@customElement("location-component")
export class Location extends LitElement {
  @property() public latitude: string;
  @property() public longitude: string;
  @property() public locationChanged: ({ latitude, longitude }) => any;

  public static styles = [GlobalStyle, Style];
  public template = Template;

  public render() {
    return this.template.bind(this)();
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
