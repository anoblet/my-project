import { html } from "lit-element";
import { isSignedIn } from "../../User";
import { signOut } from "../../User";
import { until } from "lit-html/directives/until";
import { getForm } from "./Component";

export default () => {
  return html`
    <card-component collapsible grow>
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
