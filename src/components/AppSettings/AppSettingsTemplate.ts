import { html } from '@polymer/lit-element';
import {until} from 'lit-html/directives/until';

import('@anoblet/my-grid');
import('@anoblet/my-container');
import('@anoblet/my-flex');
import('@material/mwc-icon');
import('@material/mwc-checkbox');
import('@material/mwc-formfield');

import * as style from './AppSettings.scss'

const loremIpsum = require('lorem-ipsum');

export default async function (props: any) {
  return await html`
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