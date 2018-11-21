import { html } from '@polymer/lit-element';
import { when } from 'lit-html/directives/when';

import(/* webpackChunkName: "MyFlex" */ '../../../packages/my-flex');

import * as style from './AppLogin.scss'
import * as firebaseStyle from './FirebaseUI.scss'

export default function (props: any) {
  return html`
    <style>
      ${style}
      ${firebaseStyle}
    </style>
    <my-flex direction="column">
      <div id="firebaseui-auth-container" ?hidden=${this.isSignedIn}></div>
      ${this.isSignedIn ?
        html`<button @click="${() => this._logoutHandler()}">Sign out</button>` : html `${this.ui}`
      }
    </my-flex>
  `
}