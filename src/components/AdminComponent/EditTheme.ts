import { html } from "lit-element";
import { theme as themeType } from "../ThemeComponent/Theme";

export const editTheme = (theme: any) => html`
  ${Object.keys(theme as themeType).map(
    (key: any) => html`
      <input type="color" name="${key}" value=${theme[key]}</>
    `
  )}
`;
