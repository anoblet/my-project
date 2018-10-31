import { html } from '@polymer/lit-element';
import '@anoblet/my-grid'
import '@anoblet/my-container'
import '@anoblet/my-flex'
import '@material/mwc-icon'

const loremIpsum = require('lorem-ipsum');

import * as style from './AppSettings.scss'

export default function (props: any) {
  return html`
    <style>
      ${style}
    </style>
    <input type="checkbox" @change="${(e: any) => this._changeTheme()}"></a>
    `
}

// export { view as default, view}