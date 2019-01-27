import { html } from "lit-element";

export const renderForm = (properties: any, component: any) => {
  const _properties = component.constructor.properties;
  return html`
  <grid-component style="grid-template-columns: auto min-content">
    ${Object.keys(_properties).map(
      (property: any) => html`
        <label>${_properties[property].label}</label>
        ${_properties[property].type === Boolean
          ? html`
              <input
                type="checkbox"
                ?checked=${component[property.name]}
                @change=${(e: any) => (component[property] = e.target.checked)}
              />
            `
          : ""}
        ${_properties[property].type === Number
          ? html`
              <input
                type="number"
                value=${component[property]}
                @change=${(e: any) => (component[property] = e.target.value)}
              />
            `
          : ""}
        ${_properties[property].type === String
          ? html`
              <input
                type="text"
                value=${component[property]}
                @change=${(e: any) => (component[property] = e.target.value)}
              />
            `
          : ""}
      `
    )}
    </grid-component
  `;
};
