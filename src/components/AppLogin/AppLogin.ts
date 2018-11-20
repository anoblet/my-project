import { html, LitElement, property } from '@polymer/lit-element';
import { Mixin } from '@anoblet/mixin';
import { BaseMixin } from '@anoblet/base-mixin'

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';
import { setDebug, setTheme } from '../../actions/Settings.js';

import Template from './AppLoginTemplate';

import { config } from '../../../config';

export class AppLogin extends connect(store)(Mixin(LitElement, [BaseMixin])) {
  @property({ type: Boolean }) isSignedIn = false;
  constructor() {
    super();
    // this._getIsSignedIn();
    this._isSignedIn();
    // this.isSignedIn = this._isSignedIn();
  }

  firstUpdated() {
    this._upgrade();
  }

  async _getIsSignedIn() {
    // this.isSignedIn = await this._isSignedIn();
  }

  _isSignedIn() {
    return new Promise((resolve, reject) => {
      Promise.all([
        import(/* webpackChunkName: "FirebaseApp" */ 'firebase/app'),
        import(/* webpackChunkName: "FirebaseAuth" */'firebase/auth'),
      ]).then(([firebase]) => {
        firebase.auth().onAuthStateChanged((user: any) => {
          this.isSignedIn = user ? true : false;
          resolve(user ? true : false);
        });
      });
    });

  }

  // _getConfig(firebase: any, firebaseui: any) {
  //   return {
  //     signInSuccessUrl: '/',
  //     signInOptions: [
  //       firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  //       firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  //       firebase.auth.TwitterAuthProvider.PROVIDER_ID,
  //       firebase.auth.GithubAuthProvider.PROVIDER_ID,
  //       firebase.auth.EmailAuthProvider.PROVIDER_ID,
  //       firebase.auth.PhoneAuthProvider.PROVIDER_ID,
  //       firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  //     ],
  //     tosUrl: '<your-tos-url>',
  //     privacyPolicyUrl: function () {
  //       window.location.assign('<your-privacy-policy-url>');
  //     }
  //   };
  // }

  _upgrade() {
    return new Promise(async (resolve, reject) => {
      await Promise.all([
        import(/* webpackChunkName: "FirebaseApp" */'firebase/app'),
        import(/* webpackChunkName: "FirebaseUI" */'firebaseui')
      ]).then(async ([firebase, firebaseui]) => {
        let instance = firebaseui.auth.AuthUI.getInstance();
        instance = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
        await this._isSignedIn();
        if (!this.isSignedIn) instance.start(this.shadowRoot.querySelector('#firebaseui-auth-container'), config.firebaseui);
      })
    });
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

  _logoutHandler() {
    this.isSignedIn = false;
    Promise.all([
      import(/* webpackChunkName: "FirebaseApp" */ 'firebase/app'),
      // import(/* webpackChunkName: "firebaseAuth" */ 'firebase/auth')
    ]).then(([firebase]) => {
      firebase.auth().signOut();
      this._upgrade();
    });
    this._resetSettings();
  }

  render() {
    return Template.bind(this)();
  }
}

window.customElements.define('app-login', AppLogin);
