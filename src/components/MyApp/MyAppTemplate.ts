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
                ${
                  this.state.app.mode === "development"
                    ? html`
                        <breadcrumb-component></breadcrumb-component>
                      `
                    : ""
                }
                <my-card
                  full-height
                  grow
                  no-inside-border
                  no-outside-border
                  no-title
                >
                  <my-flex slot="content">
                    <div id="page"></div>
                    <lit-route path="/" component="page-home"></lit-route>
                    <lit-route path="/info" component="page-info"></lit-route>
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
                    <lit-route path="/theme" component="app-theme"></lit-route>
                    <lit-route
                      path="/user"
                      component="user-controller"
                    ></lit-route>
                    <lit-route
                      path="/user-settings"
                      component="settings-component"
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
                    <lit-route path="/blog" component="page-blog"></lit-route>
                    <lit-route
                      path="/contact"
                      component="contact-component"
                    ></lit-route>
                    <lit-route path="/admin" component="page-admin"></lit-route>
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
