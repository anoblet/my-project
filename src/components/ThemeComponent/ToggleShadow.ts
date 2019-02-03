import { html, LitElement, property } from "lit-element";

import { store } from "../../Store";
import { updateDocument } from "../../../packages/firebase-helpers/firebase-helpers";

export const toggleShadow = () => {
  const state = store.getState();
  return html`
    <label>Toggle shadows</label>
    <input
      type="checkbox"
      ?checked=${state.settings.shadows}
      @change=${(e: any) => {
        updateDocument({
          path: `users/${state.user.uid}/settings/default`,
          data: { shadows: e.target.checked }
        });
      }}
    />
    ${false
      ? html`
          <mwc-switch
            ?checked=${state.settings.dark}
            @change=${(e: any) => {
              updateDocument({
                path: `users/${state.user.uid}/settings/default`,
                data: { shadows: e.target.checked }
              });
            }}
          ></mwc-switch>
        `
      : html``}
  `;
};
