import { html } from "lit-element";

export const string = (component: any, property: any) => html`
    <input
      type="text"
      value=${component[property]}
      @change=${property.onChange}
    />
  `
