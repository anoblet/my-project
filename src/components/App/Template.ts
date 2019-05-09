import { html } from "lit-element";
import { store } from "../../Store";
import { header, navigation } from "../Layout/Template";

export default function() {
  const state = store.getState();
  const settings = state.settings;
  return html`
    <app-header>
      ${header.bind(this)()}
    </app-header>
    <div id="center" style="position: relative;">
      <grid-component id="drawer-container" media-size="${this.mediaSize}">
        <drawer-component id="drawer" opened=${this.drawerOpened}
          >${navigation()}</drawer-component
        >
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
      <profile-menu id="profile-menu"></profile-menu>
    </div>
    <footer-component id="bottom"></footer-component>
    <menu-component></menu-component>
  `;
}

const drawer = function() {
  return html``;
};
