import { html } from "lit-element";
import("../Menu/MenuComponent");

export default function({ router, user }: any) {
  return html`
    <my-flex direction="column" id="container" style="grid-gap: 0;">
      <my-card grow no-border no-inner-padding>
        <div slot="title">
          <app-header>
            <mwc-icon id="menu" @click="${this._toggleDrawer}">menu</mwc-icon>
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
                      ${
                        this.state.app.settings
                          ? this.state.app.settings.mode >= 1
                            ? html`
                                <card-component
                                  ?hidden="${
                                    this.state.router.activeRoute === "/"
                                  }"
                                >
                                  <breadcrumb-component></breadcrumb-component
                                ></card-component>
                              `
                            : ""
                          : ""
                      }
                      <div>
                        <lit-route path="/" component="page-home"></lit-route>
                        <lit-route
                          path="/info"
                          component="page-info"
                        ></lit-route>
                        <lit-route
                          path="/post"
                          component="post-controller"
                        ></lit-route>
                        <lit-route
                          path="/post/:action"
                          component="post-controller"
                        ></lit-route>
                        <lit-route
                          path="/post/:action/:id"
                          component="post-controller"
                        ></lit-route>
                        <lit-route
                          path="/theme"
                          component="app-theme"
                        ></lit-route>
                        <lit-route
                          path="/user"
                          component="user-controller"
                        ></lit-route>
                        <lit-route
                          path="/user-settings"
                          component="settings-component"
                        ></lit-route>
                        <lit-route
                          path="/user/theme"
                          component="theme-component"
                        ></lit-route>
                        <lit-route
                          path="/user/:action"
                          component="user-controller"
                        ></lit-route>
                        <lit-route
                          path="/user/:action/:tail"
                          component="user-controller"
                        ></lit-route>
                        <lit-route
                          path="/user/:action/:tail/:id"
                          component="user-controller"
                        ></lit-route>
                        <lit-route
                          path="/blog"
                          component="page-blog"
                        ></lit-route>
                        <lit-route
                          path="/contact"
                          component="contact-component"
                        ></lit-route>
                        <lit-route
                          path="/admin"
                          component="admin-component"
                        ></lit-route>
                        <lit-route
                          path="/components"
                          component="page-components"
                        ></lit-route>
                        <lit-route
                          path="/components/:component"
                          component="page-components"
                        ></lit-route>
                      </div>
                      ${
                        this.state.settings.mode >= 1
                          ? html`
                              <card-component
                                ><h3 slot="title">Log</h3>
                                <div slot="content">
                                  <log-component></log-component></div
                              ></card-component>
                            `
                          : ""
                      }
                    </grid-component>
                  </my-flex>
                </my-card>
              </my-flex>
            </my-grid>
          </my-flex>
          <my-flex id="bottom"> <app-footer></app-footer> </my-flex>
        </div>
      </my-card>
    </my-flex>
    <menu-component></menu-component>
  `;
}
