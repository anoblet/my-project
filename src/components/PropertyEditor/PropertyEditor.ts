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

// Should be structure, values, generic onchange
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
      const field = {
        property,
        ..._properties[property],
        value: component.value,
        onChange
      };
      return html`
        <label>${_properties[property].label}</label>
        ${_properties[property].inputType
          ? html`
              ${_properties[property].inputType === "text"
                ? renderTextField(property, component, onChange)
                : ""}
              ${_properties[property].inputType === "textarea"
                ? renderTextarea(property, component, onChange)
                : ""}
            `
          : html`
              ${_properties[property].type === Boolean
                ? // ? renderCheckbox(property, component, onChange)
                  renderSwitch(field)
                : ""}
              ${_properties[property].type === Number
                ? renderNumberField(property, component, onChange)
                : ""}
              ${_properties[property].type === String
                ? renderTextField(property, component, onChange)
                : ""}
            `}
      `;
    })}
    </grid-component
  `;
};

// values
const renderTextField = (field: any, component: any, onChange: any) => {
  return html`
    <input placeholder=${field.placeholder} type="text"
    value="${component[field]}""
    @change=${(e: any) => onChange(field, e.target.value)} />
  `;
};

const renderTextarea = (field: any, component: any, onChange: any) => {
  return html`
    <textarea @change=${(e: any) => onChange(field, e.target.value)}>
${component[field]}</textarea
    >
  `;
};

const renderNumberField = (field: any, component: any, onChange: any) => {
  return html`
    <input
      type="number"
      value=${component[field]}
      @change=${(e: any) => onChange(field, e.target.value)}
    />
  `;
};

const renderCheckbox = (field: any, component: any, onChange: any) => {
  return html`
    <input
      name=${field}
      type="checkbox"
      ?checked=${component[field]}
      @change="${(e: any) => onChange(field, e.target.checked)}}"
    />
  `;
};

/**
 * Renders a toggle switch
 * @param  field
 * @return HTMLTemplateResult
 *
 * Broken
 */
const renderSwitch = ({ property, value, onChange }: any) => {
  return html`
    <mwc-switch
      name=${name}
      ?checked=${value}
      @change=${(e: any) => {
        console.log(e);
        onChange(property, e.target.checked);
      }}
    ></mwc-switch>
  `;
};
