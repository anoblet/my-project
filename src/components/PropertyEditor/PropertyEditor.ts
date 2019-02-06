// Consider a change to component-editor
import { html } from "lit-element";
import { string } from "./String";

export interface property {
  label?: string;
  type: any;
}

export const PropertyEditor = () => {};

const merge = (
  property: string,
  _properties: any,
  component: any,
  onChange: any
) => {
  return {
    property,
    ..._properties[property],
    value: component.value,
    onChange
  };
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

  return html`
  <grid-component style="grid-template-columns: auto min-content">
    ${Object.keys(_properties).map((property: any) => {
      if (property.startsWith("_")) return;
      // const field = merge(property, _properties, component, onChange);
      return html`
        ${_properties[property].inputType !== "pell"
          ? html`
              <div
                class="field"
                ?pell=${_properties[property].inputType === "pell"}
              >
                <label>${_properties[property].label}</label>
                ${_properties[property].inputType
                  ? html`
                      ${_properties[property].inputType === "text"
                        ? renderTextField(property, component, onChange)
                        : ""}
                      ${_properties[property].inputType === "textarea"
                        ? renderTextarea(property, component, onChange)
                        : ""}
                      ${_properties[property].inputType === "pell"
                        ? html`
                            <card-component>
                              <pell-component
                                name=${property}
                                .input=${component[property]}
                              ></pell-component>
                            </card-component>
                          `
                        : ""}
                    `
                  : html`
                      ${_properties[property].type === Boolean
                        ? renderCheckbox(property, component, onChange)
                        : // renderSwitch(field)
                          ""}
                      ${_properties[property].type === Number
                        ? renderNumberField(property, component, onChange)
                        : ""}
                      ${_properties[property].type === String
                        ? renderTextField(property, component, onChange)
                        : ""}
                    `}
              </div>
            `
          : html`
              <div class="field" pell>
                <card-component>
                  <label>${_properties[property].label}</label>
                  <pell-component
                    name=${property}
                    .input=${component[property]}
                  ></pell-component>
                </card-component>
              </div>
            `}
      `;
    })}
    </grid-component
  `;
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
