import { config } from "../../../../etc/config";
import { html } from "lit-element";
import { isSignedIn } from "../../../User";
import { menu } from "@anoblet/material-icons";
import { primaryColorSelect } from "../../Theme/PrimaryColorSelect";
import "@anoblet/circle-button";

export default function() {
  return html`
    <span id="menu" @click="${this._toggleDrawer}">
      ${menu}
    </span>
    <span id="title"><a href="/">${config.site.title}</a></span>
    ${isSignedIn()
      ? html`
          <circle-button
            id="userProfile"
            @click="${() => this._toggleProfile()}"
          ></circle-button>
        `
      : html`
          <div id="right">
            <grid-component style="grid-template-columns: repeat(2, 1fr)">
              <div style="display: flex; align-items: center;">
                ${false ? primaryColorSelect : html``}
              </div>
              <a href="/user/signin"
                ><button-component>Sign in</button-component></a
              >
            </grid-component>
          </div>
        `}
    <!-- <div slot="choose-theme">1</div> -->
  `;
}
