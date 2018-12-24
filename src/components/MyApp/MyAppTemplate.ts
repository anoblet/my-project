import { html } from "@polymer/lit-element";
import "../Menu/MenuComponent";

export default function({ router, user }: any) {
  return html`
    <my-flex direction="column" id="container" style="grid-gap: 0;">
      <my-card grow no-border no-inner-padding>
        <div slot="title">
          <app-header>
            <mwc-icon id="menu" @click="${() => this._toggleDrawer()}"
              >menu</mwc-icon
            >
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
            <div hidden id="profile-menu">
              <ul>
                <li>
                  ${
                    user.signedIn
                      ? html`
                          <li><a href="/theme">Theme</a></li>
                          <li><a href="/user-settings">Settings</a></li>
                        `
                      : ""
                  }
                  ${
                    user.signedIn
                      ? html`
                          <a href="/user/signout">Sign out</a>
                        `
                      : html`
                          <a href="/user/signin">Sign in</a>
                        `
                  }
                </li>
              </ul>
            </div>
            <my-grid id="drawer-container" media-size="${this.mediaSize}">
              <div
                id="drawer"
                ?hidden="${!this.drawerOpened}"
                media-size="${this.mediaSize}"
              >
                <my-card
                  collapsible
                  full-height
                  grow
                  ?no-border="${this.mediaSize == "small"}"
                >
                  <h3 slot="title">Menu</h3>
                  <div slot="content">
                    <ul>
                      <a
                        @click="${(e: Event) => this._toggleDrawer()}"
                        href="/"
                      >
                        <li>Home</li></a
                      ><a
                        @click="${(e: Event) => this._toggleDrawer()}"
                        href="/post"
                      >
                        <li>Post</li></a
                      ><a
                        @click="${(e: Event) => this._toggleDrawer()}"
                        href="/user"
                      >
                        <li>User</li></a
                      ><a
                        @click="${(e: Event) => this._toggleDrawer()}"
                        href="/info"
                      >
                        <li>Info</li></a
                      >
                    </ul>
                  </div>
                </my-card>
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
