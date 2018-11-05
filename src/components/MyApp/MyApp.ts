import { LitElement, property } from '@polymer/lit-element';
import { Mixin } from '@anoblet/mixin';
import { BaseMixin } from '@anoblet/base-mixin'
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';

import Template from './MyAppTemplate';

import '@anoblet/my-firebase';


const globalAny: any = global;

const config = {
  apiKey: "AIzaSyA1sarBCzD7i_UBEMcE5321POKcAX48YYs",
  authDomain: "my-project-75792.firebaseapp.com",
  databaseURL: "https://my-project-75792.firebaseio.com",
  projectId: "my-project-75792",
  storageBucket: "",
  messagingSenderId: "552770278955"
};

/**
 * @todo Extend BaseElement
 * 
 * import { BaseElement } from '@anoblet/base-element';
 * class BaseElement2 extends Mixin(LitElement, [BaseMixin]) {}
 * 
 * class BaseElement2 extends Mixin(LitElement, [DebugMixin]) {}
 */
export class MyApp extends connect(store)(Mixin(LitElement, [BaseMixin])) {
  @property({ type: String }) title = 'Andrew Noblet'
  firebase = {};
  firebaseConfig = {
    apiKey: "AIzaSyA1sarBCzD7i_UBEMcE5321POKcAX48YYs",
    authDomain: "my-project-75792.firebaseapp.com",
    databaseURL: "https://my-project-75792.firebaseio.com",
    projectId: "my-project-75792",
    storageBucket: "",
    messagingSenderId: "552770278955"
  }

  _toggleDrawer() {
    const drawer = this.shadowRoot.querySelector('#drawer');
    const drawerContainer = this.shadowRoot.querySelector('#drawer-container')
    drawer._toggleAttribute('hidden');
    drawerContainer._toggleAttribute('opened');
  }

  stateChanged(state: any) {
    state.settings.debug ? this.setAttribute('debug', '') : this.removeAttribute('debug');
    state.settings.theme == 'light' ? this.getAttribute('dark') == '' ? this.removeAttribute('dark') : false : this.setAttribute('dark', '');
  }

  async _loadFirebase() {
     await Promise.all([
      import(/* webpackChunkName: "firebaseApp" */ 'firebase/app'),
      import(/* webpackChunkName: "firebaseAuth" */ 'firebase/auth'),
      import(/* webpackChunkName: "firebaseui" */ 'firebaseui'),
    ]).then(([firebase, auth, firebaseui]) => {
      firebase.initializeApp(config)

      if (globalAny.firebase) {
        return globalAny.firebase
      } else if (!firebase) {
        return Promise.reject(new Error('loading error'))
      } else {
        globalAny.firebase = firebase

        const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
        googleAuthProvider.addScope('https://www.googleapis.com/auth/userinfo.email')

        globalAny.firebase.googleAuthProvider = googleAuthProvider

        return [globalAny.firebase ? globalAny.firebase : firebase, firebaseui]
      }
    }).then(([firebase, firebaseui]) => {
      const uiConfig = {
        signInSuccessUrl: 'https://localhost:8081',
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.TwitterAuthProvider.PROVIDER_ID,
          firebase.auth.GithubAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
        ],

        tosUrl: '<your-tos-url>',
        privacyPolicyUrl: function () {
          window.location.assign('<your-privacy-policy-url>');
        }
      };
      const ui = new firebaseui.auth.AuthUI(firebase.auth());
      ui.start(this.shadowRoot.querySelector('#content'), uiConfig);
    })
      .catch(err => {
        throw new Error(err)
      })
  }

  firstUpdated() {
    super.firstUpdated();
    this._loadFirebase();
  }

  render() {
    return Template.bind(this)();
  }
}

window.customElements.define('my-app', MyApp);
