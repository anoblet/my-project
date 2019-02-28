import { html } from "lit-element";
import { isSignedIn } from "../../User";
import { signOut } from "../../User";
import { until } from "lit-html/directives/until";
import { getForm } from "./AppUser";

export default () => {
  return html`
    <card-component collapsible grow>
      <h3 slot="title">User</h3>
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
