import { html } from '@polymer/lit-element';
import '@anoblet/my-grid'
import '@anoblet/my-container'
import '@anoblet/my-flex'
import '@material/mwc-icon'

const loremIpsum = require('lorem-ipsum');

import * as style from './AppSettings.scss'

import { store } from '../../store.js';
import { changeTheme, toggleDebug } from '../../actions/Settings.js';

export default function (props: any) {
  return html`
    <style>
      ${style}
    </style>
    Debug: <input type="checkbox" checked=${this.getAttribute('debug') == ''} @change="${(e: any) => store.dispatch(toggleDebug())}"></a>
    Dark Theme: <input type="checkbox" @change="${(e: any) => store.dispatch(changeTheme())}"></a>
    `
}