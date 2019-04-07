import { html } from "lit-element";

export const periodTemplate = (period: any) => html`
  <grid-component style="grid-template-columns: repeat(2, 1fr)">
    <div>Temperature:</div>
    <div>${period.temperature} ${period.temperatureUnit}</div>
    <div>Icon:</div>
    <div><img src=${period.icon} /></div>
    <div>Wind direction:</div>
    <div>${period.windDirection}</div>
    <div>Wind speed:</div>
    <div>${period.windSpeed}</div>
    <div>Short forecast:</div>
    <div>${period.shortForecast}</div>
    <div>Detailed forecast:</div>
    <div>${period.detailedForecast}</div>
  </grid-component>
`;
