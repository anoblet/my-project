import { html } from '@polymer/lit-element';
import '@anoblet/my-drawer'
import '@anoblet/my-tab-bar'

const loremIpsum = require('lorem-ipsum')
//   , output     = loremIpsum();

import * as style from './MyApp.scss'

export default function (props: any) {
  return html`
    <style>
      ${style}
    </style>
    <toolbar>
      <button @click="${(e: any) => this._toggleDrawer()}">Menu</button>
      ${this.title}
    </toolbar>   
    <div id="content">
      <my-drawer>
        This is the menu
      </my-drawer>
      <content>${loremIpsum({count: 100})}</content>
    </div>
    <my-tab-bar>
      <my-tab href="#">Test</my-tab>
      <my-tab href="#">Test</my-tab>
      <my-tab href="#">Test</my-tab>
    </my-tab-bar>
    `
}

// export { view as default, view}