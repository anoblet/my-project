// Consider a change to component-editor
import { html } from "lit-element";
import { string } from "./String";

export interface property {
  label?: string;
  type: any;
}

export const PropertyEditor = () => {};

/**
 * [keys description]
 * @param  component [description]
 * @param  properties [description]
 * @param  onChange [description]
 * @return HTMLTemplateResult
 * */
export const renderForm = (
  component: any,
  properties: any = undefined,
  onChange: any = undefined
) => {
  const _properties = properties
    ? properties
    : component.constructor.properties;

  return html`
  <grid-component style="grid-template-columns: auto min-content">
    ${Object.keys(_properties).map((property: any) => {
      if (property.startsWith("_")) return;
      return html`
        <label>${_properties[property].label}</label>
        ${_properties[property].type === Boolean
          ? html`
              <input
                name=${property}
                type="checkbox"
                ?checked=${component[property]}
                @change="${(e: any) => onChange(property, e.target.checked)}}"
              />
            `
          : ""}
        ${_properties[property].type === Number
          ? html`
              <input
                type="number"
                value=${component[property]}
                @change=${(e: any) => onChange(property, e.target.checked)}
              />
            `
          : ""}
        ${_properties[property].type === String
          ? html`
              <input
                type="text"
                value=${component[property]}
                @change=${(e: any) => onChange(property, e.target.value)}
              />
            `
          : ""}
      `;
    })}
    </grid-component
  `;
};
