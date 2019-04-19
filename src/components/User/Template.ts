import { isSignedIn, signOut } from "../../User";

import { getForm } from "./Component";
import { html } from "lit-element";
import { until } from "lit-html/directives/until";

export default () => {
  return html`
    <card-component>
      <div slot="content">
        ${isSignedIn()
          ? html`
              <mwc-button raised @click="${signOut}">Sign out</mwc-button>
            `
          : html`
              ${until(getForm())}
            `}
      </div>
    </card-component>
  `;
};
