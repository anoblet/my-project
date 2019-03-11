import { html } from "lit-element";

const defaultOnChange = (e: any) => (this._data[name] = e.detail.value);

export const renderForm = ({ onChange, structure, values }: any) => {
  return html`
    <grid-component>
      ${Object.keys(structure).map((property: any) => {
        if (property.startsWith("_")) return;
        const field = {
          disabled: structure[property].disabled,
          name: property,
          onChange,
          value: values[property]
        };
        return html`
          ${structure[property].inputType !== "pell"
            ? html`
                <div class="field">
                  <label>${structure[property].label}</label>
                  ${structure[property].inputType
                    ? html`
                        ${structure[property].inputType === "text"
                          ? renderText(field)
                          : ""}
                        ${structure[property].inputType === "textarea"
                          ? renderTextarea(property, values, onChange)
                          : ""}
                        ${structure[property].inputType === "pell"
                          ? html`
                              <card-values>
                                <pell-values
                                  name=${property}
                                  .input=${values[property]}
                                ></pell-values>
                              </card-values>
                            `
                          : ""}
                      `
                    : html`
                        ${structure[property].type === Boolean
                          ? renderCheckbox(property, values, onChange)
                          : // renderSwitch(field)
                            ""}
                        ${structure[property].type === Number
                          ? renderNumber(field)
                          : ""}
                        ${structure[property].type === String
                          ? renderText(field)
                          : ""}
                      `}
                </div>
              `
            : html`
                <div class="field" pell>
                  <card-values>
                    <label>${structure[property].label}</label>
                    <pell-values
                      name=${property}
                      .input=${values[property]}
                    ></pell-values>
                  </card-values>
                </div>
              `}
        `;
      })}
    </grid-component>
  `;
};

export const renderNumber = ({ disabled, name, onChange, value }: any) => {
  onChange = onChange || defaultOnChange;
  return html`
    <input
      name="${name}"
      type="number"
      value=${value}
      ?disabled=${disabled}
      @change=${onChange}
    />
  `;
};

export const renderText = ({ disabled, name, onChange, value }: any) => {
  onChange = onChange || defaultOnChange;
  value = value || "";
  return html`
    <input
      name="${name}"
      type="text"
      value=${value}
      ?disabled=${disabled}
      @change=${onChange}
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
