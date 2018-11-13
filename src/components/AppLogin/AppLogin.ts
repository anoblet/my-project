import { html, LitElement, property } from '@polymer/lit-element';
import { until } from 'lit-html/directives/until';
import { Mixin } from '@anoblet/mixin';
import { BaseMixin } from '@anoblet/base-mixin'

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';
import { setDebug, setTheme } from '../../actions/Settings.js';

import Template from './AppLoginTemplate';

import(/* webpackChunkName: "MyFirebaseLogin" */ '@anoblet/my-firebase/MyFirebaseLogin')
export class AppLogin extends connect(store)(Mixin(LitElement, [BaseMixin])) {
  @property({type: Boolean}) isSignedIn = false;

  _isSignedIn() {
    return Promise.all([
      import('firebase/app'),
      import('firebase/auth'),
      import('firebase/firestore'),
    ]).then(([firebase]) => {
      firebase.auth().onAuthStateChanged((user: any) => {
        if(user) this.isSignedIn = true;
      });
    })
  }

  _resetSettings() {
    this._updateStore({
      debug: false,
      theme: 'light'
    })
  }

  _updateStore(data: any) {
    const state = store.getState();
    const mergedState = Object.assign(state, data)
    return new Promise(async (resolve, reject) => {
      await store.dispatch(setDebug(mergedState.debug));
      await store.dispatch(setTheme(mergedState.theme));
      resolve();
    });
  }

  _loadUi() {
    Promise.all([
      import(/* webpackChunkName: "firebaseApp" */ 'firebase/app'),
      import(/* webpackChunkName: "FirebaseAuth" */ 'firebase/auth'),
      import(/* webpackChunkName: "firebaseui" */ 'firebaseui'),
    ]).then(([firebase, auth, firebaseui]) => {
      const uiConfig = {
        ...this.uiConfig,
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.TwitterAuthProvider.PROVIDER_ID,
          firebase.auth.GithubAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
        ]
      };
      let ui = firebaseui.auth.AuthUI.getInstance();
      if (!ui) {
        ui = new firebaseui.auth.AuthUI(firebase.auth());
      }
      // if (ui.isPendingRedirect()) {
        ui.start(this.shadowRoot.querySelector('#firebaseui-auth-container'), uiConfig);
      // }
    });
  }

  _logoutHandler() {
    this.isSignedIn = false;
    Promise.all([
      import(/* webpackChunkName: "firebaseApp" */ 'firebase/app'),
      import(/* webpackChunkName: "firebaseAuth" */ 'firebase/auth')
    ]).then(([firebase]) => {
      firebase.auth().signOut();
    });
    this._resetSettings();
  }

  _preRender(dependencies: any) {
    return new Promise(async (resolve) => {
      await Promise.all(dependencies).then(() => {
        if(!this.isSignedIn) this._loadUi();
        resolve();
      })
    });
  }
  
  render() {
    return html`
      ${until(
        this._preRender(
          [this._isSignedIn()]
        ).then(() => {
          return Template.bind(this)();
        })
      )}
    `;
    return Template.bind(this)();
  }
}

window.customElements.define('app-login', AppLogin);
