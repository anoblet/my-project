import { html } from "lit-element";
import { until } from "lit-html/directives/until";
import "@material/mwc-button";

import(/* webpackChunkName: "MyFlex" */ "../../../packages/my-flex");

export default function({ user }: any) {
  return html`
    <card-component collapsible grow>
      <h3 slot="title">User</h3>
      <my-flex direction="column" grow slot="content">
        ${
          user.signedIn
            ? html`
                <mwc-button raised @click="${() => this._signoutHandler()}"
                  >Sign out</mwc-button
                >
              `
            : html`
                ${
                  until(
                    this.getForm(),
                    html`
                      <my-loader></my-loader>
                    `
                  )
                }
              `
        }
      </my-flex>
    </card-component>
  `;
}
