import { html } from '@polymer/lit-element';
import '@anoblet/my-grid'
import '@anoblet/my-container'
import '@anoblet/my-flex'
import '@material/mwc-icon'

const loremIpsum = require('lorem-ipsum');

import * as style from './AppSettings.scss'

import { store } from '../../store.js';
import { changeTheme } from '../../actions/Settings.js';

export default function (props: any) {
  return html`
    <style>
      ${style}
    </style>
    ${this.theme}
    <input type="checkbox" @change="${(e: any) => store.dispatch(changeTheme(this.theme == 'light' ? 'dark' : 'light'))}"></a>
    `
}

// export { view as default, view}