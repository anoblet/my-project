import { LitElement, customElement, property } from "lit-element";

import Template from "./Template";
import Style from "./Style";
import GlobalStyle from "../../GlobalStyle";

@customElement("weather-component")
export class Weather extends LitElement {
  @property() public latitude: string;
  @property() public longitude: string;

  public get properties() {
    return {
      latitude: {
        inputType: "text",
        label: "Latitude",
        type: String
      },
      longitude: {
        inputType: "text",
        label: "Longitude",
        type: String
      }
    };
  }

  static get styles() {
    return [GlobalStyle, Style];
  }

  public render() {
    return Template.bind(this)();
  }

  public latitudeChanged(e: any) {
    this.latitude = e.target.value;
  }

  public longitudeChanged(e: any) {
    this.longitude = e.target.value;
  }

  public positionChanged(position: any) {
    this.latitude = position.latitude;
    this.longitude = position.longitude;
  }
}

export const getPoints = async (coordinates: {
  latitude: string;
  longitude: string;
}) => {
  const url = `https://api.weather.gov/points/${coordinates.latitude},${
    coordinates.longitude
  }`;
  return await fetch(url).then(function(response) {
    return response.json();
  });
};

export const getForecast = async (coordinates: {
  latitude: string;
  longitude: string;
}) => {
  const points = await getPoints(coordinates);
  return await fetch(points.properties.forecast).then(function(response) {
    return response.json();
  });
};

export const getPeriod = async (coordinates: any, index: number) => {
  const forecast = await getForecast(coordinates);
  const period = forecast.properties.periods[index];
  return {
    detailedForecast: period.detailedForecast,
    icon: period.icon,
    shortForecast: period.shortForecast,
    temperature: period.temperature,
    temperatureUnit: period.temperatureUnit,
    windDirection: period.windDirection,
    windSpeed: period.windSpeed
  };
};
