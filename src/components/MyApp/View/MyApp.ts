import { html } from '@polymer/lit-element';
import '../../AppSettings/AppSettings';
import '@anoblet/my-grid'
import '@anoblet/my-container'
import '@anoblet/my-flex'
import '@material/mwc-icon'

const loremIpsum = require('lorem-ipsum');

import * as style from './MyApp.scss'

export default function (props: any) {
  return html`
    <style>
      ${style}
    </style>
    <my-container>
      <my-container id="top" class="row">
        <mwc-icon id="menu" @click="${() => this._toggleDrawer()}">menu</mwc-icon>
        <span id="title">${this.title}</span>
      </my-container>
      <my-flex id="middle" class="row grow">
        <my-grid id="drawer-container">
          <my-flex id="drawer" class="scroll" hidden>${loremIpsum({count: 10})}</my-flex>
          <my-flex id="content" grow class="scroll">
            <app-settings></app-settings>
          </my-flex>
        </my-grid>
      </my-flex>
      <my-container id="bottom" class="row">
        Bottom
      </my-container>
    </my-container>
    `
}