import { html } from "lit-element";

const defaultOnChange = (e: any) => (this._data[name] = e.detail.value);


export const renderNumber = ({
  name,
  onChange,
  value
}: any) => {
  onChange = onChange || defaultOnChange;
  return html`
    <input name="${name}" type="number" value=${value} @change=${onChange} />
  `;
};

export const renderText = ({
  name,
  onChange,
  value
}: any) => {
  onChange = onChange || defaultOnChange;
  return html`
    <input name="${name}" type="text" value=${value} @change=${onChange} />
  `;
};
