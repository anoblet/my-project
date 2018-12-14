import { html } from '@polymer/lit-element';
import { until } from 'lit-html/directives/until';

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
            <a href="/user">
              <mwc-fab
                id="userProfile"
                mini
                label="Account"
                @click="${() => this._toggleProfile()}"
                >Profile</mwc-fab
              >
            </a>
          </app-header>
        </div>
        <div slot="content">
          <my-flex
            id="center"
            style="position: relative; word-wrap: break-word;"
          >
            <my-grid id="drawer-container" opened ?small="${this.mediaSize}">
              <media-query query="(max-width: 500px)">
                <app-drawer-absolute class="drawer">
                  <my-card collapsible full-height grow no-border>
                    <h3 slot="title">Menu</h3>
                    <div slot="content">
                      <ul>
                        <a href="/"> <li>Home</li></a
                        ><a href="/user"> <li>User</li></a
                        ><a href="/theme"> <li>Theme</li></a
                        ><a href="/info"> <li>Info</li></a>
                      </ul>
                    </div>
                  </my-card>
                </app-drawer-absolute>
              </media-query>
              <media-query query="(min-width: 500px)">
                <my-flex id="drawer">
                  <app-drawer>
                    <my-card collapsible full-height grow no-border>
                      <h3 slot="title">Menu</h3>
                      <div slot="content">
                        <ul>
                          <a href="/"> <li>Home</li></a
                          ><a href="/user"> <li>User</li></a
                          ><a href="/theme"> <li>Theme</li></a
                          ><a href="/info"> <li>Info</li></a>
                        </ul>
                      </div>
                    </my-card>
                  </app-drawer>
                </my-flex>
              </media-query>
              <my-flex id="content" grow scroll>
                <my-card grow no-inside-border no-outside-border no-title>
                  <my-flex slot="content">
                    <lit-route
                      ?active="${this.state.router.activeRoute == '/'}"
                      path="/"
                      component="page-home"
                    ></lit-route>
                    <lit-route
                      ?active="${this.state.router.activeRoute == '/user'}"
                      path="/user"
                      component="page-user"
                    ></lit-route>
                    <lit-route
                      ?active="${this.state.router.activeRoute == '/theme'}"
                      path="/theme"
                      component="app-theme"
                    ></lit-route>
                    <lit-route
                      ?active="${this.state.router.activeRoute == '/info'}"
                      path="/info"
                      component="page-info"
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
  `;
}
