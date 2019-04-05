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

  public async getLocation() {
    const location: any = await getLocation();
    console.log(location);
    const result = await fetch(
      `https://api.weather.gov/points/${location.latitude},${
        location.longitude
      }`
    ).then(function(response) {
      return response.json();
    });
    const forecast = await fetch(result.properties.forecast)
      .then((response: any) => {
        return response.json();
      })
      .then((json: any) => {
        return json.properties.periods[0].temperature;
      });
    console.log(forecast);
  }

  public async getTemperature() {
    const period = await this.getPeriod();
    return period.temperature;
  }

  public async getPeriod() {
    const location: any = await getLocation();
    return await fetch(
      `https://api.weather.gov/points/${location.latitude},${
        location.longitude
      }`
    )
      .then(function(response) {
        return response.json();
      })
      .then(async (result: any) => {
        return fetch(result.properties.forecast)
          .then((response: any) => {
            return response.json();
          })
          .then((json: any) => {
            return json.properties.periods[0];
          });
      });
  }
}
