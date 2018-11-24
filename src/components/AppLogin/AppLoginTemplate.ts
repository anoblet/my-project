import { html } from '@polymer/lit-element';
import { until } from 'lit-html/directives/until';
import { when } from 'lit-html/directives/when';
import '@material/mwc-button';

import(/* webpackChunkName: "MyFlex" */ '../../../packages/my-flex');

import * as style from './AppLogin.scss'
import * as firebaseStyle from './FirebaseUI.scss'

export default function ({ signedIn }: any) {
  return html`
    <style>
      ${style}
      ${firebaseStyle}
    </style>
    <my-flex direction="column" grow>
      ${signedIn ?
        html`<mwc-button raised @click="${() => this._logoutHandler()}">Sign out</mwc-button>` : html`${until(this.getForm(), html`Loading`)}`
      }
    </my-flex>
  `
}