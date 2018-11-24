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

export default function ({ settings, user }: any) {
  return html`
    <style>
      ${style}
    </style>
    <my-flex direction="column">
      <div>
        Dark: <input type="checkbox" aria-label="Theme" ?checked=${this.state.settings.theme == 'dark'} @change="${(e: any) => this._toggleThemeHandler()}">
      </div>
      <div>
        Debug (Works, but looks weird): <input type="checkbox" aria-label="Debug" ?checked=${this.state.settings.debug} @change="${(e: any) => this._toggleDebugHandler()}">
      </div>
      <div>
        Primary color (Working): <input @input="${(e: any) => this.primaryColorChanged(e)}" aria-label="Primary color" type="color" value="${settings.primaryColor}" />
      </div>
      <div>
        Secondary color (Working): <input @input="${(e: any) => this.secondaryColorChanged(e)}" aria-label="Secondary color" type="color" value="${settings.secondaryColor}" />
      </div>
      <div>
        Theme (Not working): 
        <select aria-label="Select your theme">
          <option>Light</option>
          <option>Dark</option>
        </select>
      </div>
    </my-flex>
  `
}