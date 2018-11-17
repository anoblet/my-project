import { html, LitElement, property } from '@polymer/lit-element';
import { Mixin } from '@anoblet/mixin';
import { BaseMixin } from '@anoblet/base-mixin'

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';
import { setDebug, setTheme } from '../../actions/Settings.js';

import Template from './AppLoginTemplate';

export class AppLogin extends connect(store)(Mixin(LitElement, [BaseMixin])) {
  @property({ type: Boolean }) isSignedIn = false;
  constructor() {
    super();
    this._isSignedIn();
  }

  connectedCallback() {
    super.connectedCallback();
    this._upgrade();
  }

  // _isSignedIn() {
  //   // return await new Promise((resolve, reject) => {
  //     return Promise.all([
  //       import('firebase/app'),
  //       import('firebase/auth'),
  //     ]).then(([firebase]) => {
  //       return firebase.auth().onAuthStateChanged((user: any) => {
  //         if(user) this.isSignedIn = true;
  //         return user ? true : false;
  //       });
  //     });
  //   // });

  // }

  async _isSignedIn() {
    return await new Promise((resolve, reject) => {
      Promise.all([
        import('firebase/app'),
        import('firebase/auth'),
      ]).then(([firebase]) => {
        firebase.auth().onAuthStateChanged((user: any) => {
          if(user) this.isSignedIn = true;
          // user ? resolve(true) : resolve(false);
        });
      });
    });

  }

  _getConfig(firebase: any, firebaseui: any ) {
    return {
      signInSuccessUrl: '/',
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
      privacyPolicyUrl: function() {
        window.location.assign('<your-privacy-policy-url>');
      }
    };
  }

  _upgrade() {
    return new Promise(async (resolve, reject) => {
      await Promise.all([
        import('firebase/app'),
        import('firebaseui')
      ]).then(([firebase, firebaseui]) => {
        let instance = firebaseui.auth.AuthUI.getInstance();
        instance = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
        if(!this.isSignedIn) instance.start(this.shadowRoot.querySelector('#firebaseui-auth-container'), this._getConfig(firebase, firebaseui));
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
      import(/* webpackChunkName: "firebaseApp" */ 'firebase/app'),
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
