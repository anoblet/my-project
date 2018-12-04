import { html } from '@polymer/lit-element';
import { until } from 'lit-html/directives/until';
import '../../../packages/lorem-ipsum';

export default function ({ user }: any) {
  return html`
    <my-flex direction="column" id="container" style="grid-gap: 0;">
      <app-header>
        <mwc-icon id="menu" @click="${() => this._toggleDrawer()}">menu</mwc-icon>
        <span id="title">${this.title}</span>
        <mwc-fab id="userProfile" mini label="Account" @click="${() => this._toggleProfile()}">Profile</mwc-fab>
      </app-header>
      <my-flex id="center" style="word-wrap: break-word;">
        <my-grid id="drawer-container">
          <my-flex id="drawer" class="scroll" grow hidden>
            <my-card grow>
              <span slot="title">Menu</span>
              <ul>
                <li>
                  <a href="/user">User</a>
                </li>
                <li>
                  <a href="/theme">Theme</a>
                </li>
              </ul>
            </my-card>
          </my-flex>
          <my-flex id="content" grow scroll>
            <my-flex grow style="padding-right: 1em;">
              <lit-route path="/" component="page-home"></lit-route>
              <lit-route path="/user" component="page-user"></lit-route>
              <lit-route path="/theme" component="app-theme"></lit-route>
            </my-flex>
          </my-flex>
        </my-grid>
      </my-flex>
      <my-flex id="bottom">
        <app-footer></app-footer>
      </my-flex>
    </my-flex>
    `
}
