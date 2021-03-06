import { html } from "lit-element";
import { setTheme } from "./ThemeComponent";
import {
  addDocument,
  getDocument
} from "../../Firebase";
import { store } from "../../Store";
import { toast } from "../Toast/Toast";

const saveTheme = async (name: string, scope: any) => {
  const state = store.getState();
  // const theme = state.theme;
  const theme = await getDocument({
    path: `users/${state.user.uid}/settings/theme`
  });
  addDocument({
    path: `users/${state.user.uid}/settings/theme/savedThemes`,
    data: { ...theme.currentTheme, ...{ name } }
  }).then(() => toast("Theme saved!"));
};

export default function() {
  return html`
    <input id="name" placeholder="Theme name" type="text" />
    <mwc-button
      outlined
      @click="${(e: any) => {
        const field = this.renderRoot.querySelector(
          "#name"
        ) as HTMLInputElement;
        saveTheme(field.value, this);
      }}"
    >
      Save theme
    </mwc-button>
  `;
}
