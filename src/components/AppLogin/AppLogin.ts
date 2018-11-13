import { html, LitElement, property } from '@polymer/lit-element';
import { until } from 'lit-html/directives/until';
import { Mixin } from '@anoblet/mixin';
import { BaseMixin } from '@anoblet/base-mixin'

import Template from './AppLoginTemplate';

import(/* webpackChunkName: "MyFirebaseLogin" */ '@anoblet/my-firebase/MyFirebaseLogin')
export class AppLogin extends Mixin(LitElement, [BaseMixin]) {
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
    Promise.all([
      import(/* webpackChunkName: "firebaseApp" */ 'firebase/app'),
      import(/* webpackChunkName: "firebaseAuth" */ 'firebase/auth')
    ]).then(([firebase]) => {
      firebase.auth().signOut();
    });
    this.isSignedIn = false;
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
