import { config } from "../../../config";
import { html } from "lit-element";
import { isSignedIn } from "../../User";
import { store } from "../../Store";
import "../Button/ButtonComponent";

export default function() {
  const state = store.getState();
  const settings = state.settings;
  return html`
    <app-header>
      <span id="menu">
        <i class="material-icons" @click="${this._toggleDrawer}">menu</i>
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
            <a href="/user/signin"
              ><button-component label="Sign in">Sign in</button-component></a
            >
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
      <grid-component id="drawer-container" media-size="${this.mediaSize}">
        <drawer-component
          id="drawer"
          opened=${this.drawerOpened}
        ></drawer-component>
        <div id="content" grow scroll>
          <grid-component style="margin: 1em;">
            ${state.user.settings
              ? state.user.settings.breadcrumbs
                ? html`
                    <card-component>
                      <breadcrumb-component></breadcrumb-component
                    ></card-component>
                  `
                : ""
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
      </grid-component>
    </div>
    <app-footer id="bottom"></app-footer>
    <menu-component></menu-component>
    <voice-component></voice-component>
  `;
}
