import { html } from "lit-element";
import { setTheme } from "./ThemeComponent";

export default function(themes: any) {
  return html`
    <ul>
      ${
        themes.map(
          (theme: any) =>
            html`
              <a href=""
                ><li @click="${() => setTheme(theme)}">${theme.name}</li></a
              >
            `
        )
      }
    </ul>
  `;
}
