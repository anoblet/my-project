import { html } from '@polymer/lit-element';

const loremIpsum = require('lorem-ipsum');

import * as style from './MyApp.scss'

export default function (props: any) {
  return html`
    <style>
      ${style}
    </style>
    <my-grid id="container">
      <my-flex id="top">
        <mwc-icon id="menu" @click="${() => this._toggleDrawer()}">menu</mwc-icon>
        <span id="title">${this.title}</span>
        <mwc-fab id="userProfile" mini label="Account" @click="${() => this._toggleProfile()}">Profile</mwc-fab>
      </my-flex>
      <my-flex id="center">
        <my-grid id="drawer-container">
          <my-flex id="drawer" class="scroll" hidden>${loremIpsum({count: 10})}</my-flex>
          <my-flex id="content" grow>
            <app-settings class="scroll"></app-settings>
            <app-login></app-login>
          </my-flex>
        </my-grid>
      </my-flex>
      <my-flex id="bottom">
        <app-footer></app-footer>
      </my-flex>
    </my-grid>
    `
}