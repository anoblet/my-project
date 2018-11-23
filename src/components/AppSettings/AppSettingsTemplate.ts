import { html } from '@polymer/lit-element';
import * as style from './AppSettings.scss';
import('../../../packages/my-card');
import('../../../packages/my-grid');
import('../../../packages/my-flex');
import('../../../packages/lorem-ipsum');
import('@material/mwc-icon');
import('@material/mwc-checkbox');
import('@material/mwc-formfield');


// import * as loremIpsum from 'lorem-ipsum';
const loremIpsum = require('lorem-ipsum');

export default function ({ settings }: any) {
  return html`
    <style>
      ${style}
    </style>
    <my-flex direction="column">
      <div>
        Dark: <input type="checkbox" aria-label="Theme" ?checked=${this.theme == 'dark'} @change="${(e: any) => this._toggleThemeHandler()}">
      </div>
      <div>
        Debug: <input type="checkbox" aria-label="Debug" ?checked=${this.debug} @change="${(e: any) => this._toggleDebugHandler()}">
      </div>
      <div>
        Primary color: <input type="text" value="${settings.primaryColor}" />
      </div>
      <div>
        Theme: 
        <select>
          <option>Light</option>
          <option>Dark</option>
        </select>
      </div>
    </my-flex>
  `
}