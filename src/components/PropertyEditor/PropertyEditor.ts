// Consider a change to component-editor
import { html } from "lit-element";
import {
  renderForm as _renderForm,
  renderNumber,
  renderText
} from "../Form/Form";

export interface Property {
  label?: string;
  type: any;
}

export const PropertyEditor = () => {
  return;
};

export interface FormField {
  type: string; // text, textarea, Number
  value?: any;
}

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

  return _renderForm({ structure: _properties, values: component, onChange });
};

// values
const renderTextField = (field: any, component: any, onChange: any) => {
  const value = component[field] || "";
  return html`
    <input
      name="${field}"
      type="text"
      value=${value}
      @change=${(e: any) => onChange(field, e.target.value)}
    />
  `;
};

const renderTextarea = (field: any, component: any, onChange: any) => {
  return html`
    <textarea
      name=${field}
      @change=${(e: any) => onChange(field, e.target.value)}
    >
${component[field]}</textarea
    >
  `;
};

const renderNumberField = (field: any, component: any, onChange: any) => {
  return html`
    <input
      name=${field}
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
