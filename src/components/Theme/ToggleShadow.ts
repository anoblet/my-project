import { html } from "lit-element";

import { store } from "../../Store";
import { updateDocument } from "../../Firebase";

export const toggleShadow = () => {
  const state = store.getState();
  return html`
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
    <label>Toggle shadows</label>
  `;
};
