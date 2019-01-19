import { html } from "lit-element";

const updateField = (field: string, value: string) => false;

const renderField = (field: any, currentTheme: any) => html`
  <input
    name="${field.name}"
    type="color"
    value="${currentTheme[field.name]}"
    @input="${(e: any) => updateField(field.name, e.target.value)}"
  />
`;

export default ({ fields, currentTheme }: any) =>
  html`
    ${fields.map((field: any) => renderField(fields, currentTheme))}
  `;
