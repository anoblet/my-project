import { html } from "lit-element";
import { store } from "../../Store";
import { header, navigation } from "../Layout/Template";

export default function() {
  const state = store.getState();
  const settings = state.settings;
  return html`
    <header-component>
      ${header.bind(this)()}
    </header-component>
    <grid-component id="drawer-container" media-size="${this.mediaSize}">
      <drawer-component id="drawer" opened=${this.drawerOpened}
        >${navigation()}</drawer-component
      >
      <grid-component id="content">
        ${state.user.settings
          ? state.user.settings.breadcrumbs
            ? html`
                <card-component>
                  <breadcrumb-component></breadcrumb-component
                ></card-component>
              `
            : ""
          : ""}
        <div id="portal"></div>
        ${settings.displayLog
          ? html`
              <card-component
                ><h3 slot="title">Log</h3>
                <div slot="content">
                  <log-component></log-component></div
              ></card-component>
            `
          : ""}
      </grid-component>
      <profile-menu id="profile-menu"></profile-menu>
    </grid-component>
    <footer-component id="bottom"></footer-component>
    <menu-component></menu-component>
  `;
}
