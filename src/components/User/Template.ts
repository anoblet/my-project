import { html } from "lit-element";
import { isSignedIn, signOut } from "../../User";
import { until } from "lit-html/directives/until";
import { getForm } from "./Component";

export default () => {
  return html`
    <card-component grow>
      <div slot="content">
        ${false && isSignedIn()
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
