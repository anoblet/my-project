import { html } from "lit-element";
import { setTheme } from "./ThemeComponent";

export default function() {
  return html`
    <ul>
      ${
        this.savedThemes.map(
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
