import { html } from "lit-element";
import { filterByMode } from "../../Debug";

export default function({ router, user }: any) {
  return html`
    <my-flex direction="column" id="container" style="grid-gap: 0;">
      <my-card grow no-border no-inner-padding>
        <div slot="title">
          <app-header>
            <mwc-fab icon="menu" id="menu" mini @click="${this._toggleDrawer}">menu</mwc-fab>
            <span id="title"><a href="/">${this.title}</a></span>
            <mwc-fab
              id="userProfile"
              mini
              label="Account"
              @click="${() => this._toggleProfile()}"
              >Profile</mwc-fab
            >
          </app-header>
        </div>
        <div slot="content">
          <my-flex id="center" style="position: relative;">
            <profile-menu id="profile-menu"></profile-menu>
            <my-grid id="drawer-container" media-size="${this.mediaSize}">
              <div
                id="drawer"
                ?hidden="${!this.drawerOpened}"
                media-size="${this.mediaSize}"
              >
                <app-drawer></app-drawer>
              </div>
              <my-flex id="content" grow scroll>
                <my-card
                  full-height
                  grow
                  no-inside-border
                  no-outside-border
                  no-title
                >
                  <my-flex slot="content">
                    <grid-component style="margin: 1em;">
                      ${this.state.settings.breadcrumbs
                        ? html`
                            <card-component>
                              <!--<breadcrumb-component></breadcrumb-component
                            >--></card-component
                            >
                          `
                        : ""}
                      <div id="portal"></div>
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
          </my-flex>
        </div>
      </my-card>
    </my-flex>
    <my-flex id="bottom"> <app-footer></app-footer> </my-flex>
    <toast-component></toast-component>
    <menu-component></menu-component>
  `;
}
