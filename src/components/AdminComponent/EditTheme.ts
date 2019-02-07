import { html } from "lit-element";
import { theme } from "../ThemeComponent/Theme";

export const editTheme = (theme: any) => html`
  ${Object.keys(theme as theme).map(
    (key: any) => html`
      <input type="color" name="${key}" value=${theme[key]} @change=${(e: any) => {}} />
    `
  )}
`;
