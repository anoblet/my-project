import "../Chart/ChartComponent";
import "../GoogleChart/Component";

import { populationByCountry, populationByState } from "../CitySDK/CitySDK";

import { html } from "lit-element";
import { store } from "../../Store";
import { until } from "lit-html/directives/until";

const state = store.getState();
const theme = state.app.settings.theme;
const options = {
  backgroundColor: theme.backgroundColor,
  colors: [theme.primaryColor, theme.linkColor],
  legend: {
    textStyle: { color: theme.textColor }
  }
};

export default function() {
  return html`
    <grid-component columns="1">
      <card-component>
        <h3 slot="title">US Population</h3>
        ${until(
          populationByCountry().then((result: any) =>
            result[0]["B01001_001E"].toLocaleString()
          )
        )}
      </card-component>
      <card-component>
        <h3 slot="title">Population by state (bar)</h3>
        <div slot="content">
          ${until(
            populationByState().then((states: any) => {
              const mapArray = states.map(function(obj) {
                return Object.keys(obj)
                  .sort()
                  .map(function(key) {
                    return obj[key];
                  });
              });
              const newArray = [["State", "Population"], ...mapArray];
              return html`
                <google-chart
                  .data=${newArray}
                  .options=${options}
                ></google-chart>
              `;
            }),
            html`
              Loading...
            `
          )}
        </div>
      </card-component>
      <card-component>
        <h3 slot="title">Population by state (table)</h3>
        <grid-component columns="2">
          ${until(
            populationByState().then(
              (states: any) =>
                html`
                  ${states.map(
                    (state: any) =>
                      html`
                        <span>${state.name}</span
                        ><span style="text-align: center;"
                          >${state.population.toLocaleString()}</span
                        >
                      `
                  )}
                `
            ),
            html`
              Loading...
            `
          )}
        </grid-component>
      </card-component>
    </grid-component>
  `;
}
