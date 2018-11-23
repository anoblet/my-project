import { html } from '@polymer/lit-element';

const loremIpsum = require('lorem-ipsum');

import * as style from './MyApp.scss'

export default function ({user}: any) {
  return html`
    <style>
      ${style}
    </style>
    <my-grid id="container" style="grid-gap: 0;">
      <my-flex id="top">
        <mwc-icon id="menu" @click="${() => this._toggleDrawer()}">menu</mwc-icon>
        <span id="title">${this.title}</span>
        <mwc-fab id="userProfile" mini label="Account" @click="${() => this._toggleProfile()}">Profile</mwc-fab>
      </my-flex>
      <my-flex id="center" style="word-wrap: break-word;">
        <my-grid id="drawer-container">
          <my-flex id="drawer" class="scroll" hidden>${loremIpsum({count: 10})}</my-flex>
          <my-flex direction="column" id="content" class="scroll" grow>
          <my-card>
              <app-login></app-login>
          </my-card>  
          <my-card>
              <app-settings></app-settings>
            </my-card>
          </my-flex>
        </my-grid>
      </my-flex>
      <my-flex id="bottom" style="position: fixed; right: 0; bottom: 0; left: 0;">
        <app-footer></app-footer>
      </my-flex>
    </my-grid>
    `
}