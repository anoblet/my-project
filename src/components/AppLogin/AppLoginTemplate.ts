import { html } from '@polymer/lit-element';
import(/* webpackChunkName: "MyFlex" */ '@anoblet/my-flex');

import * as style from './AppLogin.scss'
import * as firebaseStyle from './FirebaseUI.scss'

const config = {
  apiKey: "AIzaSyA1sarBCzD7i_UBEMcE5321POKcAX48YYs",
  authDomain: "my-project-75792.firebaseapp.com",
  databaseURL: "https://my-project-75792.firebaseio.com",
  projectId: "my-project-75792",
  storageBucket: "",
  messagingSenderId: "552770278955"
};

const uiConfig = {
  signInSuccessUrl: '/',
  tosUrl: '<your-tos-url>',
  privacyPolicyUrl: function () {
    window.location.assign('<your-privacy-policy-url>');
  }
};

export default function (props: any) {
  return html`
    <style>
      ${style}
      ${firebaseStyle}
    </style>
    <my-flex direction="column">
      ${this.isSignedIn ? 
        html`<button @click="${() => this._logoutHandler()}">Sign out</button>`
        :
        html`<div id="firebaseui-auth-container"></div>`
      }
    </my-flex>
  `
}