import { html } from "lit-element";
import { setTheme } from "./ThemeComponent";
import { store } from "../../Store";
import { deleteDocument } from "../../../packages/firebase-helpers";

export default function(themes: any) {
  const state = store.getState();
  const path = `users/${state.user.uid}/settings/theme/savedThemes`;
  return html`
    <ul>
      ${themes.map(
        (theme: any) =>
          html`
            <li @click="${() => setTheme(theme)}">
              <a href="">${theme.name}</a> (<button
                @click=${() => deleteDocument({ path: `${path}/${theme.id}` })}
              >
                Delete</button
              >)
            </li>
          `
      )}
    </ul>
  `;
}
