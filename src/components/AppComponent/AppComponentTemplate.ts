import { config } from "../../../config";
import { html } from "lit-element";
import { isSignedIn } from "../../User";

export default function({ router, settings, user }: any) {
  // console.log(!!user);
  return html`
    <app-header>
      <mwc-fab icon="menu" id="menu" mini @click="${this._toggleDrawer}"
        >menu</mwc-fab
      >
      <span id="title"><a href="/">${config.site.title}</a></span>
      ${isSignedIn()
        ? html`
            <mwc-fab
              id="userProfile"
              mini
              label="Account"
              @click="${() => this._toggleProfile()}"
              >Profile</mwc-fab
            >
          `
        : html`
            <a href="/user/signin"><mwc-button>Sign in</mwc-button></a>
            <!-- <mwc-fab
              icon="account_circle"
              id="userProfile"
              mini
              label="Account"
              @click="${() => this._toggleProfile()}"
              >Profile</mwc-fab
            > -->
          `}
    </app-header>
    <div id="center" style="position: relative;">
      <profile-menu id="profile-menu"></profile-menu>
      <my-grid id="drawer-container" media-size="${this.mediaSize}">
        <drawer-component
          id="drawer"
          opened=${this.drawerOpened}
        ></drawer-component>
        <div id="content" grow scroll>
          <my-card full-height grow no-inside-border no-outside-border no-title>
            <div slot="content">
              <grid-component style="margin: 1em;">
                ${settings.breadcrumbs
                  ? html`
                      <card-component>
                        <breadcrumb-component></breadcrumb-component
                      ></card-component>
                    `
                  : ""}
                <div id="portal" style="display: flex;"></div>
                ${settings.displayLog
                  ? html`
                      <card-component
                        ><h3 slot="title">Log</h3>
                        <div slot="content">
                          <log-component></log-component></div
                      ></card-component>
                    `
                  : ""}
                  <!-- <span id="made-width">Made with ♥ by Andrew Noblet -->
              </grid-component>
            </div>
          </my-card>
        </div>
      </my-grid>
    </div>
    <app-footer id="bottom"></app-footer>
    <toast-component></toast-component>
    <menu-component></menu-component>
  `;
}
