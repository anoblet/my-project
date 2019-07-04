import { html } from "lit-element";
import { store } from "../../Store";
import { header, navigation } from "../Layout/Template";

const getSettings = () => {
  const state = store.getState();
  return state.settings;
};

/**
 * Template function should render sub-templates
 * Indicative by a sub-template directory
 * A helper function would need to wrap the "auto" templates
 * Drawer needs to be separated into a factory with a boolean
 * App doesn't need to know about drawer-container in layout
 */
export default function() {
  const settings = getSettings();
  return html`
    <header-component>
      ${header.bind(this)()}
    </header-component>
    <grid-component id="drawer-container" media-size="${this.mediaSize}">
      <drawer-component id="drawer" opened=${this.drawerOpened}
        >${navigation()}</drawer-component
      >
      <grid-component id="content">
        ${settings.breadcrumbs
          ? html`
              <card-component>
                <breadcrumb-component></breadcrumb-component
              ></card-component>
            `
          : ""}
        <div id="portal"></div>
        ${settings && settings.displayLog
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
  `;
}
