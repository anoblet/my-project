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

export default function ({ app, user }: any) {
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
        <mwc-button outlined @click="${() => this.setTheme("light")}">Light theme</mwc-button>
        <mwc-button outlined @click="${() => this.setTheme("dark")}">Dark theme</mwc-button>
      </my-grid>
    </my-flex>
  `
}
