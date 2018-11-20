import { html, LitElement, property } from '@polymer/lit-element';
import { Mixin } from '@anoblet/mixin';
import { BaseMixin } from '@anoblet/base-mixin'
import { TaskMixin } from '../../TaskMixin';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';
import { setDebug, setTheme } from '../../actions/Settings.js';

import Template from './AppLoginTemplate';

import * as style from './AppLogin.scss';

import { config } from '../../../config';

export class AppLogin extends connect(store)(Mixin(LitElement, [BaseMixin, TaskMixin])) {
  @property({ type: Boolean }) isSignedIn = false;
  taskPending = false;

  constructor() {
    super();
    // this._isSignedIn();
  }

  connectedCallback() {
    super.connectedCallback();
    this.runTasks([
      this._isSignedIn(),
    ])
  }

  firstUpdated() {
    this._upgrade();
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

  _upgrade() {
    return new Promise(async (resolve, reject) => {
      await Promise.all([
        import(/* webpackChunkName: "FirebaseApp" */'firebase/app'),
        import(/* webpackChunkName: "FirebaseUI" */'firebaseui')
      ]).then(async ([firebase, firebaseui]) => {
        let instance = firebaseui.auth.AuthUI.getInstance();
        instance = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
        if (!this.isSignedIn) instance.start(this.shadowRoot.querySelector('#firebaseui-auth-container'), config.firebaseui);
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
