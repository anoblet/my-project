import { html } from "lit-element";
import { setTheme } from "./ThemeComponent";
import { addDocument } from "../../../packages/firebase-helpers/firebase-helpers";
import { store } from "../../Store";

const saveTheme = (name: string) => {
  const state = store.getState();
  const theme = state.theme;
  addDocument({
    path: `users/${state.user.uid}/settings/theme/savedThemes`,
    data: { ...state.theme, ...{ name } }
  });
};

export default function() {
  return html`
    <input id="name" placeholder="Theme name" type="text" />
    <mwc-button
      outlined
      @click="${
        (e: any) => {
          const field = <HTMLInputElement>(
            this.renderRoot.querySelector("#name")
          );
          saveTheme(field.value);
        }
      }"
    >
      Save theme
    </mwc-button>
  `;
}
