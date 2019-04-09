import { html } from "lit-element";
import { until } from "lit-html/directives/until";
import { populationByCountry, populationByState } from "../Census/Census";

export default function() {
  return html`
    <grid-component columns="1">
      <card-component title="US Population">
        ${until(
          populationByCountry().then((result: any) =>
            result[0]["B01001_001E"].toLocaleString()
          )
        )}
      </card-component>
      <card-component title="Population by state">
        <grid-component columns="2">
          ${until(
            populationByState().then((states: any) =>
              states.map(
                (state: any) =>
                  html`
                    <span>${state.name}</span
                    ><span>${state.population.toLocaleString()}</span>
                  `
              )
            )
          )}
        </grid-component>
      </card-component>
    </grid-component>
  `;
}
