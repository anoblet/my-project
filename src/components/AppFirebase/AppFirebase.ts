import { LitElement } from '@polymer/lit-element';
import { Mixin } from '@anoblet/mixin';
import { BaseMixin } from '@anoblet/base-mixin'

import Template from './AppFirebaseTemplate';

import * as firebase from 'firebase/app';
// import * as firebaseui from 'firebaseui';
const firebaseui = require('firebaseui');
export class AppFirebase extends Mixin(LitElement, [BaseMixin]) {
  constructor() {
    super();
    const config = {
      apiKey: "AIzaSyA1sarBCzD7i_UBEMcE5321POKcAX48YYs",
      authDomain: "my-project-75792.firebaseapp.com",
      databaseURL: "https://my-project-75792.firebaseio.com",
      projectId: "my-project-75792",
      storageBucket: "",
      messagingSenderId: "552770278955"
    }

    //if (firebase.apps.length === 0) {
    firebase.initializeApp(config)
    //}
  }

  firstUpdated() {
    console.log('Here');
    super.firstUpdated();
    this._generateUi();
  }

  _generateUi() {
    const uiConfig = {
      signInSuccessUrl: 'https://localhost:8081',
      tosUrl: '<your-tos-url>',
      privacyPolicyUrl: function () {
        window.location.assign('<your-privacy-policy-url>');
      }
    };

    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start(this.shadowRoot.querySelector('#firebaseui-auth-container'), uiConfig);
  }

  render() {
    return Template.bind(this)();
  }
}

window.customElements.define('app-firebase', AppFirebase);
