import "@material/mwc-fab";
import { html } from "lit-element";
import { until } from "lit-html/directives/until";

export default function({ user }: any) {
  return html`
    <my-grid id="content-grid" style="flex: 1; height: min-content;">
      <my-card collapsible grow>
        <h3 slot="title">State</h3>
        <div slot="content">
          <pre>${JSON.stringify(this.state, null, 2)};</pre>
        </div>
      </my-card>
      <my-card collapsible grow>
        <h3 slot="title">Firebase</h3>
        <div slot="content">
          ${
            user.signedIn
              ? html`
                  ${this.firebaseState}
                `
              : html`
                  Sign in to see a Firebase document
                `
          }
        </div>
      </my-card>
    </my-grid>
  `;
}
