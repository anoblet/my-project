import { html } from "lit-element";
import { until } from "lit-html/directives/until";
import "@material/mwc-button";

import(/* webpackChunkName: "MyFlex" */ "../../../packages/my-flex");

//import * as style from "./AppUser.scss";
// import * as firebaseStyle from "./FirebaseUI.scss";

export default function({ user }: any) {
  return html`
    <!--
    <style>
      @import "https://www.gstatic.com/firebasejs/ui/3.5.2/firebase-ui-auth.css";
    </style> -->
    <my-card collapsible grow>
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
    </my-card>
  `;
}
