import { LitElement, customElement, property } from "lit-element";

import Template from "./Template";
import Style from "./Style";
import GlobalStyle from "../../GlobalStyle";

import { getLocation } from "../../Location";

@customElement("weather-component")
export class Component extends LitElement {
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

  public async getPoints() {
    const url = `https://api.weather.gov/points/${this.location.latitude},${
      this.location.longitude
    }`;
    return await fetch(url).then(function(response) {
      return response.json();
    });
  }

  public async getForecast() {
    const points = await this.getPoints();
    return await fetch(points.properties.forecast).then(function(response) {
      return response.json();
    });
  }

  public async getPeriod() {
    const forecast = await this.getForecast();
    const period = forecast.properties.periods[0];
    const newPeriod = {
      temperature: period.temperature,
      temperatureUnit: period.temperatureUnit
    };
    return newPeriod;
  }

  public async getTemperature() {
    if (!this.location) return;
    const period = await this.getPeriod();
    return { temperature: period.temperature, unit: period.temperatureUnit };
  }

  public async getLocation() {
    this.location = await getLocation();
  }
}
