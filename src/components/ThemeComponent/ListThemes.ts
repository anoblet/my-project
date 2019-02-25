import { html } from "lit-element";
import { setTheme } from "./ThemeComponent";
import { store } from "../../Store";
import { deleteDocument } from "../../../packages/firebase-helpers";
import { toast } from "../Toast/Toast";

export default function(themes: any) {
  const state = store.getState();
  const path = `users/${state.user.uid}/settings/theme/savedThemes`;
  return html`
    <grid-component style="grid-template-columns: 1fr min-content">
      ${themes.map(
        (theme: any) =>
          html`
            <a
              href=""
              @click="${() =>
                setTheme(theme)
                  .then(() => toast("Theme updated"))
                  .catch(() => toast("Could not update theme"))}"
              >${theme.name}</a
            >
            <button
              @click=${() => deleteDocument({ path: `${path}/${theme.id}` })}
            >
              Delete
            </button>
          `
      )}
    </grid-component>
  `;
}
