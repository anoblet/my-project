import { html } from "lit-element";
import { updateDocument } from "../../Firebase";
import { store } from "../../Store";
import { toast } from "../Toast/Toast";
import { setState } from "../../State";
import { convert, setTheme } from "../../Theme";
import { isSignedIn } from "../../User";

const updateField = (field: string, value: string) => {
  const state = store.getState();
  const theme = state.app.settings.theme;
  const newTheme = { ...theme, ...{ [field]: value } };
  setState({
    type: "app",
    data: { settings: { theme: newTheme } },
    store
  });
  if (isSignedIn())
    updateDocument({
      path: `users/${state.user.uid}/settings/theme`,
      data: { currentTheme: { [field]: value } }
    })
      .then(() => {
        return;
      })
      .catch(() => {
        toast("Error");
      });
  setTheme(
    convert({ [field]: value }),
    document.querySelector("app-component")
  );
};

const renderField = (
  field: { label: string; name: string; property: string; type: string },
  theme: any
) => html`
  <label>${field.label}</label>
  ${field.type === "color"
    ? html`
        <input
          name="${field.name}"
          type="color"
          value="${theme[field.property]}"
          @input="${(e: any) => updateField(field.property, e.target.value)}"
        />
      `
    : ""}
  ${field.type === "size"
    ? html`
        <input
          name="${field.name}"
          type="text"
          value="${theme[field.property]}"
          @input="${(e: any) => updateField(field.property, e.target.value)}"
        />
      `
    : ""}
  ${field.type === "range"
    ? html`
        <input
          name="${field.name}"
          type="range"
          min="0"
          max="0"
          value="${theme[field.property]}"
          @input="${(e: any) => updateField(field.property, e.target.value)}"
        />
      `
    : ""}
`;

export default ({ fields, theme }: any) =>
  html`
    <grid-component style="grid-template-columns: auto max-content">
      ${fields.map((field: any) => renderField(field, theme))}
    </grid-component>
  `;
