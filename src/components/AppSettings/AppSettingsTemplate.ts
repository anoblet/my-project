import { html } from '@polymer/lit-element';
import '@anoblet/my-grid'
import '@anoblet/my-container'
import '@anoblet/my-flex'
import '@material/mwc-icon'

import '@material/mwc-checkbox';
import '@material/mwc-formfield';

import { store } from '../../store.js';
import { changeTheme, toggleDebug } from '../../actions/Settings.js';

import * as style from './AppSettings.scss'

const loremIpsum = require('lorem-ipsum');

export default function (props: any) {
  return html`
    <style>
      ${style}
    </style>
    Debug: <input type="checkbox" label="Debug" checked=${this.getAttribute('debug') == ''} @change="${(e: any) => store.dispatch(toggleDebug())}">
    Dark Theme: <input type="checkbox" type="checkbox" @change="${(e: any) => store.dispatch(changeTheme())}">
    ${loremIpsum({count: 100})}
  `
}