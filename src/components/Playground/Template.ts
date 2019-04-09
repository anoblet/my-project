import { html } from "lit-element";
import { until } from "lit-html/directives/until";
import { getFIPS, populationByState } from "../Census/Census";

export default function() {
  return html`
    <card-component>
      <grid-component columns="2">
        ${until(
          populationByState().then((states: any) => {
            return states.map((state: any) => {
              return html`
                <span>${state.name}</span><span>${state.population}</span>
              `;
            });
          }),
          html`
            Loading
          `
        )}
      </grid-component>
    </card-component>
  `;
}
