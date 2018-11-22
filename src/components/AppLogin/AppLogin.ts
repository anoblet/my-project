import { LitElement, property } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { config } from '../../../config';
import { BaseMixin } from '../../../packages/BaseMixin';
import { Mixin } from '../../../packages/Mixin';
import { setDebug, setTheme } from '../../actions/Settings.js';
import { store } from '../../store.js';
import { TaskMixin } from '../../../packages/TaskMixin';
import Template from './AppLoginTemplate';
import * as firebase from 'firebase/app';
const firebaseui = require('firebaseui');

export class AppLogin extends connect(store)(Mixin(LitElement, [BaseMixin, TaskMixin])) {
  @property({ type: Boolean }) isSignedIn = false;
  form: any;

  connectedCallback() {
    super.connectedCallback();
    this.runTasks([
      // this._isSignedIn(),
      this.registerAuthStateChanged(),
      // this._upgrade()
    ])
  }

  _isSignedIn() {
    return new Promise((resolve, reject) => {
      Promise.all([
        import(/* webpackChunkName: "FirebaseApp" */ 'firebase/app'),
        import(/* webpackChunkName: "FirebaseAuth" */'firebase/auth'),
      ]).then(([firebase]) => {
        firebase.auth().onAuthStateChanged((user: any) => {
          if (this.isSignedIn && !user) this._logoutHandler();
          this.isSignedIn = user ? true : false;
          resolve(user ? true : false);
        });
      });
    });
  }

  registerAuthStateChanged() {
    Promise.all([
      import(/* webpackChunkName: "FirebaseApp" */ 'firebase/app'),
      import(/* webpackChunkName: "FirebaseAuth" */'firebase/auth'),
    ]).then(([firebase]) => {
      firebase.auth().onAuthStateChanged((user: any) => {
        this.authStateChanged(user);
      });
    });
  }

  signedIn(user: any) {
    return user ? true : false;
  }

  authStateChanged(user: any) {
    console.log(user);
    const userModel:any = {};
    this.isSignedIn = this.signedIn(user);
    if(this.isSignedIn) {
      userModel.name = user.displayName;
      userModel.email = user.email;
      userModel.photo = this.getPhotoUrl(user);
    }
  }

  getPhotoUrl(user: any) {
    return user.photoURL;
  }

  _upgrade() {
    return new Promise(async (resolve, reject) => {
      Promise.all([
        import(/* webpackChunkName: "FirebaseApp" */'firebase/app'),
        import(/* webpackChunkName: "FirebaseUI" */'firebaseui')
      ]).then(async ([firebase, firebaseui]) => {
        const instance = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
        const e = document.createElement('div');
        instance.start(e, config.firebaseui);
        this.form = e;
        resolve();
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
    const settings = state.settings;
    const mergedState = Object.assign(settings, data)
    return new Promise(async (resolve, reject) => {
      await store.dispatch(setDebug(mergedState.debug));
      await store.dispatch(setTheme(mergedState.theme));
      resolve();
    });
  }

  _logoutHandler() {
    this.logout();
  }

  logout() {
    Promise.all([
      import(/* webpackChunkName: "FirebaseApp" */ 'firebase/app'),
      // import(/* webpackChunkName: "firebaseAuth" */ 'firebase/auth')
    ]).then(([firebase]) => {
      firebase.auth().signOut();
      this.runTasks([
        this._resetSettings(),
        this._isSignedIn(),
      ])
    });
  }

  getForm() {
    return Promise.all([
      import(/* webpackChunkName: "FirebaseApp" */'firebase/app'),
      import(/* webpackChunkName: "FirebaseUI" */'firebaseui')
    ]).then(async ([firebase, firebaseui]) => {
      const form = document.createElement('div');
      const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
      ui.start(form, config.firebaseui);
      return form;
    })
  }

  render() {
    return Template.bind(this)();
  }
}

window.customElements.define('app-login', AppLogin);
