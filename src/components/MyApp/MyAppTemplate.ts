import { html } from '@polymer/lit-element';
import { until } from 'lit-html/directives/until';
import '../../../packages/lorem-ipsum';

export default function ({ user }: any) {
  return html`
    <my-flex direction="column" id="container" style="grid-gap: 0;">
      <my-flex id="top">
        <mwc-icon id="menu" @click="${() => this._toggleDrawer()}">menu</mwc-icon>
        <span id="title">${this.title}</span>
        <mwc-fab id="userProfile" mini label="Account" @click="${() => this._toggleProfile()}">Profile</mwc-fab>
      </my-flex>
      <my-flex id="center" style="word-wrap: break-word;">
        <my-grid id="drawer-container">
          <my-flex id="drawer" class="scroll" grow hidden>
            <my-card grow>
              <span slot="title">Menu</span>
              <ul>
                <li>
                  <a href="#" rel="noopener">Settings</a>
                </li>
              </ul>
            </my-card>
          </my-flex>
          <my-flex id="content" grow scroll>
            <my-grid id="content-grid" style="grid-template-columns: repeat(auto-fit, minmax(350px, 1fr) );">
              <my-card style="grid-column: 1/-1">
                <div slot="title">Welcome</div>
                Welcome ${user.name ? user.name : 'Guest'}! ${!user.signedIn ? html`Sign in to save settings` : html`You are currently signed in: Your settings will now be saved`}.
              </my-card>
              <my-card>
                <div slot="title">User</div>
                <app-login></app-login>
                <app-user></app-user>
              </my-card>
              <my-card>
                <div slot="title">State</div>
                  <pre style="overflow: hidden;">${JSON.stringify(this.state, null, 2)};</pre>
              </my-card>
              <my-card>
                <div slot="title">Firebase</div>
                ${user.signedIn ? html`
                  ${until(
                    this.getDocument('theme').then((document: any) => {
                      return html`
                        <pre>${JSON.stringify(document, null, 2)}</pre>
                      `
                    }),
                    html`<my-loader></my-loader>`
                  )}
                ` : html`Sign in to see a Firebase document`}
              </my-card>
              <my-card>
                <div slot="title">Theme</div>
                <app-theme></app-theme>
              </my-card>
              <my-card style="grid-column: 1/-1">
                <div slot="title">Lorem Ipsum</div>
                <lorem-ipsum count="100"></lorem-ipsum>
              </my-card>
            </my-grid>
          </my-flex>
        </my-grid>
      </my-flex>
      <my-flex id="bottom">
        <app-footer></app-footer>
      </my-flex>
    </my-flex>
    `
}
