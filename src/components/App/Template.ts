import { config } from "../../../config";
import { html } from "lit-element";
import { isSignedIn } from "../../User";
import { store } from "../../Store";
import { primaryColorSelect } from "../Theme/PrimaryColorSelect";

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
    </app-header>
    <div id="center" style="position: relative;">
      <profile-menu id="profile-menu"></profile-menu>
      <grid-component id="drawer-container" media-size="${this.mediaSize}">
        <drawer-component
          id="drawer"
          opened=${this.drawerOpened}
        ></drawer-component>
        <div id="content" grow>
          <grid-component id="content-grid" style="contain: initial;">
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
            <!-- <span id="made-with">Made with ♥ by Andrew Noblet -->
          </grid-component>
        </div>
      </grid-component>
    </div>
    <footer-component id="bottom"></footer-component>
    <menu-component></menu-component>
  `;
}

const drawer = function() {
  return html``;
};
