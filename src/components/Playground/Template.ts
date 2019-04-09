import { html } from "lit-element";
import { until } from "lit-html/directives/until";
import { getFIPS, populationByState } from "../Census/Census";

export default function() {
  return html`
    <grid-component>
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
  `;
}
