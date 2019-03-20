// Consider a change to component-editor
import { html } from "lit-element";
import { renderForm as _renderForm } from "../Form/Form";

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
 * Render form
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
