import { html } from '@polymer/lit-element';
import { until } from 'lit-html/directives/until';
import '../../../packages/lorem-ipsum';

export default function ({ user }: any) {
  return html`
    <my-grid id="container" style="grid-gap: 0;">
      <my-flex id="top">
        <mwc-icon id="menu" @click="${() => this._toggleDrawer()}">menu</mwc-icon>
        <span id="title">${this.title}</span>
        <mwc-fab id="userProfile" mini label="Account" @click="${() => this._toggleProfile()}">Profile</mwc-fab>
      </my-flex>
      <my-flex id="center" style="word-wrap: break-word;">
        <my-grid id="drawer-container">
          <my-flex id="drawer" class="scroll" hidden>
            <my-card>
              <lorem-ipsum></lorem-ipsum>
            </my-card>
          </my-flex>
          <my-flex direction="column" id="content" class="scroll" grow>
            <my-card>
              <div slot="title">Welcome</div>
              Welcome ${user.name ? user.name : 'guest'} ${!user.signedIn ? html`Sign in to save settings` : html`You are currently signed in: Your settings will now be saved`}.
            </my-card>
            <my-card>
              <div slot="title">State</div>
              <pre style="overflow: hidden;">${JSON.stringify(this.state, null, 2)};</pre>
            </my-card>
            <div>
              <my-grid style="grid-template-columns: 1fr 1fr;">
                <my-card>
                  <div slot="title">User</div>
                  <app-login></app-login>
                </my-card>
                ${(user ? html`
                  <my-card>
                    <div slot="title">Settings</div>
                    <app-settings></app-settings>
                  </my-card>
                ` : html``)}
              </my-grid>
            </div>
            <my-card>
              <div slot="title">Firebase</div>
                ${until(
                  this.getDocument().then((document: any) => {
                    return html`
                      <pre>
                        ${JSON.stringify(document)}
                      </pre>
                    `
                  }),
                  html`Loading...`
                )}
            </my-card>
            <my-card>
              <div slot="title">Lorem Ipsum</div>
              <lorem-ipsum count="100"></lorem-ipsum>
            </my-card>
          </my-flex>
        </my-grid>
      </my-flex>
      <my-flex id="bottom">
        <app-footer></app-footer>
      </my-flex>
    </my-grid>
    `
}
