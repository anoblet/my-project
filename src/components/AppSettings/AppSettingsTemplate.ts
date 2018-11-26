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
    <my-flex direction="column" grow>
      <my-grid style="grid-template-columns: 1fr 1fr;">
        <label>Debug</label>
        <input type="checkbox" aria-label="Debug" ?checked=${this.state.settings.debug} @change="${(e: any) => this._toggleDebugHandler()}">
        <label>Primary color</label>
        <input @input="${(e: any) => this.primaryColorChanged(e)}" aria-label="Primary color" type="color" value="${settings.primaryColor}" />
        <label>Secondary color</label>
        <input @input="${(e: any) => this.secondaryColorChanged(e)}" aria-label="Secondary color" type="color" value="${settings.secondaryColor}" />
        <label>Dark (Boolean)</label>
        <input type="checkbox" aria-label="Theme" ?checked=${this.state.settings.theme == 'dark'} @change="${(e: any) => this._toggleThemeHandler()}">
        <label>Theme (String)</label>
        <select @input="${(e: any) => this.setTheme(e.target.value)}" aria-label="Select your theme">
          <option ?selected=${settings.theme == 'light'} value="light">Light</option>
          <option ?selected=${settings.theme == 'dark'} value="dark">Dark</option>
        </select>
      </my-grid>
    </my-flex>
  `
}