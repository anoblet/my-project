import { config } from "../../../config";
import { filterByMode } from "../../Debug";
import { html } from "lit-element";

export default function({ router, user }: any) {
  return html`
    <app-header>
      <mwc-fab icon="menu" id="menu" mini @click="${this._toggleDrawer}"
        >menu</mwc-fab
      >
      <span id="title"><a href="/">${config.site.title}</a></span>
      <mwc-fab
        id="userProfile"
        mini
        label="Account"
        @click="${() => this._toggleProfile()}"
        >Profile</mwc-fab
      >
    </app-header>
    <div id="center" style="position: relative;">
      <profile-menu id="profile-menu"></profile-menu>
      <my-grid id="drawer-container" media-size="${this.mediaSize}">
        <drawer-component
          id="drawer"
          opened=${this.drawerOpened}
        ></drawer-component>
        <my-flex id="content" grow scroll>
          <my-card full-height grow no-inside-border no-outside-border no-title>
            <my-flex slot="content">
              <grid-component style="flex: 1; margin: 1em;">
                ${this.state.settings.breadcrumbs
                  ? html`
                      <card-component>
                        <breadcrumb-component></breadcrumb-component
                      ></card-component>
                    `
                  : ""}
                <div id="portal" style="display: flex;"></div>
                ${this.state.settings.displayLog
                  ? html`
                      <card-component
                        ><h3 slot="title">Log</h3>
                        <div slot="content">
                          <log-component></log-component></div
                      ></card-component>
                    `
                  : ""}
              </grid-component>
            </my-flex>
          </my-card>
        </my-flex>
      </my-grid>
    </div>
    <app-footer id="bottom"></app-footer>
    <toast-component></toast-component>
    <menu-component></menu-component>
  `;
}
