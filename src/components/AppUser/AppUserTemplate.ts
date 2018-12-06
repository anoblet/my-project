import { html } from '@polymer/lit-element';
import { until } from 'lit-html/directives/until';
import { when } from 'lit-html/directives/when';
import '@material/mwc-button';

import(/* webpackChunkName: "MyFlex" */ '../../../packages/my-flex');

import * as style from './AppUser.scss'
import * as firebaseStyle from './FirebaseUI.scss'

export default function ({ user }: any) {
  return html`
    <style>
      ${style}
      ${firebaseStyle}
    </style>
    <my-card collapsible grow>
      <h2 slot="title">User</h2>
      <my-flex direction="column" grow slot="content">
      ${user.signedIn ?
        html`<mwc-button raised @click="${() => this._signoutHandler()}">Sign out</mwc-button>` : html`${until(this.getForm(), html`<my-loader></my-loader>`)}`
      }
      </my-flex>
    </my-card>
  `
}
