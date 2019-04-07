import { LitElement, customElement, property } from "lit-element";

import Template from "./Template";
import Style from "./Style";
import GlobalStyle from "../../GlobalStyle";

import { state } from "../../State";
import { store } from "../../Store";
import { getPositionAsync } from "../Location/lib";

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
    if (!this.location) return;
    const url = `https://api.weather.gov/points/${this.location.latitude},${
      this.location.longitude
    }`;
    return await fetch(url).then(function(response) {
      return response.json();
    });
  }

  public async getForecast() {
    const points = await this.getPoints();
    if (!points) return;
    return await fetch(points.properties.forecast).then(function(response) {
      return response.json();
    });
  }

  public async getPeriod(index: number) {
    const forecast = await this.getForecast();
    const period = forecast.properties.periods[index];
    console.log(period);
    const newPeriod = {
      temperature: period.temperature,
      temperatureUnit: period.temperatureUnit,
      windDirection: period.windDirection,
      windSpeed: period.windSpeed
    };
    return newPeriod;
  }

  public async getTemperature() {
    if (!this.location) return;
    const period = await this.getPeriod(0);
    return { temperature: period.temperature, unit: period.temperatureUnit };
  }

  public async getLocation() {
    const location = await getPositionAsync();
    this.location = location;
    state.set({
      type: "user",
      data: { location },
      store
    });
  }

  public latitudeChanged(e: any) {
    this.latitude = e.target.value;
  }

  public longitudeChanged(e: any) {
    this.longitude = e.target.value;
  }
}
