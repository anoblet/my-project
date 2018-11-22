import { html } from '@polymer/lit-element';

import('../../../packages/my-grid');
import('../../../packages/my-flex');
import('@material/mwc-icon');
import('@material/mwc-checkbox');
import('@material/mwc-formfield');

import * as style from './AppSettings.scss'

// import * as loremIpsum from 'lorem-ipsum';
const loremIpsum = require('lorem-ipsum');

export default function (props: any) {
  return html`
    <style>
      ${style}
    </style>
    <my-flex direction="column">
      <div>
        Debug: <input type="checkbox" aria-label="Debug" ?checked=${this.debug} @change="${(e: any) => this._toggleDebugHandler()}">
      </div>
      <div>
        Dark Theme: <input type="checkbox" aria-label="Theme" ?checked=${this.theme == 'dark'} @change="${(e: any) => this._toggleThemeHandler()}">
      </div>
      ${loremIpsum({count: 100})}
    </my-flex>
  `
}