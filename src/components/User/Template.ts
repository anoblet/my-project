import { html } from "lit-element";
import { isSignedIn, signOut } from "../../User";
import { until } from "lit-html/directives/until";
import { getForm } from "./Component";

export default function() {
  return html`
    <card-component>
      <div slot="body">
        ${false && isSignedIn()
          ? html`
              <button-component>
                raised @click="${signOut}">Sign out</button-component
              >
            `
          : html`
              ${until(getForm())}
            `}
      </div>
    </card-component>
  `;
}
