import { LitElement, property } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { config } from '../../../config';
import { BaseMixin } from '../../../packages/BaseMixin';
import { Mixin } from '../../../packages/Mixin';
import { setDebug, setTheme } from '../../actions/Settings.js';
import { store } from '../../store.js';
import { TaskMixin } from '../../TaskMixin';
import Template from './AppLoginTemplate';

export class AppLogin extends connect(store)(Mixin(LitElement, [BaseMixin, TaskMixin])) {
  @property({ type: Boolean }) isSignedIn = false;
  taskPending = false;
  ui: any;

  connectedCallback() {
    super.connectedCallback();
    this.runTasks([
      this._isSignedIn(),
      this._upgrade()
    ])
  }

  _isSignedIn() {
    return new Promise((resolve, reject) => {
      Promise.all([
        import(/* webpackChunkName: "FirebaseApp" */ 'firebase/app'),
        import(/* webpackChunkName: "FirebaseAuth" */'firebase/auth'),
      ]).then(([firebase]) => {
        firebase.auth().onAuthStateChanged((user: any) => {
          if(this.isSignedIn && !user) this._logoutHandler(); 
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
        const instance = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
        const e = document.createElement('div');
        instance.start(e, config.firebaseui);
        this.ui = e;
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

  render() {
    return Template.bind(this)();
  }
}

window.customElements.define('app-login', AppLogin);
