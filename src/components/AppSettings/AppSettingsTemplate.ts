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

export default function ({ app, settings, user }: any) {
  return html`
    <style>
      ${style}
    </style>
    <my-flex direction="column" grow>
      <my-grid style="grid-template-columns: 1fr 1fr;">
        <label>Background color</label>
        <input @input="${(e: any) => this.setState({backgroundColor: e.target.value}, 'app')}" aria-label="Background color" type="color" value="${app.backgroundColor}" />
        <label>Text color</label>
        <input @input="${(e: any) => this.setState({textColor: e.target.value}, 'app')}" aria-label="Text color" type="color" value="${app.textColor}" />
        <label>Primary color</label>
        <input @input="${(e: any) => this.primaryColorChanged(e)}" aria-label="Primary color" type="color" value="${app.primaryColor}" />
        <label>Secondary color</label>
        <input @input="${(e: any) => this.secondaryColorChanged(e)}" aria-label="Secondary color" type="color" value="${app.secondaryColor}" />
        <label>Dark (Boolean)</label>
        <input type="checkbox" aria-label="Theme" ?checked=${this.state.settings.theme == 'dark'} @change="${(e: any) => this._toggleThemeHandler()}">
        <label>Sync theme (Boolean)</label>
        <input type="checkbox" aria-label="Sync" ?checked=${this.state.app.sync} @change="${(e: any) => this._toggleSync(e.target.value)}">
      </my-grid>
    </my-flex>
  `
}