import { html } from '@polymer/lit-element';
import '../../AppSettings/AppSettings';
import '@anoblet/my-grid'
// import '@anoblet/my-container'
import '@anoblet/my-flex'
import '@material/mwc-icon'
import '@material/mwc-fab'

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
        <mwc-fab id="userProfile" mini @click="${() => this._toggleProfile()}">menu</mwc-fab>
      </my-flex>
      <my-flex id="middle">
        <my-grid id="drawer-container">
          <my-flex id="drawer" class="scroll" hidden>${loremIpsum({count: 10})}</my-flex>
          <my-flex id="content" grow class="scroll">
            <app-settings></app-settings>
          </my-flex>
        </my-grid>
      </my-flex>
      <my-flex id="bottom">
        Bottom
      </my-flex>
    </my-grid>
    `
}