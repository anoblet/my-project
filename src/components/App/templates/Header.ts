import { config } from "../../../../config";
import { html } from "lit-element";
import { isSignedIn } from "../../../User";
import { menu } from "../../../assets/menu";

export default function() {
  return html`
    <span id="menu" @click="${this._toggleDrawer}">
      ${menu}
    </span>
    <span id="title"><a href="/">${config.site.title}</a></span>
    ${isSignedIn()
      ? html`
          <span
            class="circle"
            id="userProfile"
            mini
            label="Account"
            @click="${() => this._toggleProfile()}"
          >
          </span>
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
    <div slot="choose-theme">1</div>
  `;
}
