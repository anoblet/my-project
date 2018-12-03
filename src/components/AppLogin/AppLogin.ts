import { LitElement, property } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { config } from '../../../config';
import { BaseMixin } from '../../../packages/BaseMixin';
import { Mixin } from '../../../packages/Mixin';
import { StateMixin } from '../../../packages/StateMixin';
import { TaskMixin } from '../../../packages/TaskMixin';
import { store } from '../../store.js';
import Template from './AppLoginTemplate';

import * as firebase from 'firebase/app'
const firebaseui = require('firebaseui');

export class AppLogin extends Mixin(connect(store)(LitElement), [BaseMixin, TaskMixin, StateMixin]) {
  @property({ type: Boolean }) isSignedIn = false;
  @property({ type: Object }) form: any;
  // form: any;

  constructor() {
    super();
    this.setStore(store);
    this.addType('user');
  }

  connectedCallback() {
    super.connectedCallback();
    const div = document.createElement('div');
    this.form = this.createForm(div);
    this.runTasks([
      this.registerAuthStateChanged(),
    ])
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
    const userModel:any = {};
    const signedIn = user ? true: false;
    userModel.signedIn = signedIn;
    if(signedIn) {
      userModel.name = user.displayName;
      userModel.email = user.email;
      userModel.photo = this.getPhotoUrl(user);
    }
    this.setState(userModel, 'user');
  }

  getPhotoUrl(user: any) {
    return user.photoURL;
  }

  _resetSettings() {
    this.setState({
      "backgroundColor": "#242424",
      "borderColor": "#CCC",
      "textColor": "#CCC",
      "primaryColor": "#00ff00",
      "secondaryColor": "#ff0080"
    }, 'theme');
  }

  _updateStore(data: any) {
    const settings= store.getState().settings;
    const mergedState = {...settings, ...data}
    return new Promise(async (resolve, reject) => {
      // await store.dispatch(setDebug(mergedState.debug));
      // await store.dispatch(setTheme(mergedState.theme));
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
      this.setState({
        signedIn: false,
        name: false,
        email: false,
        photo: false
      }, 'user');
      this.runTasks([
        this._resetSettings(),
      ])
    });
  }

  createForm(el: any) {
    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
    ui.start(el, {...config.firebaseui, ...{'credentialHelper': firebaseui.auth.CredentialHelper.NONE}});
    return el;
  }

  getForm() {
    return new Promise((resolve, reject) => {
      Promise.all([
        import(/* webpackChunkName: "FirebaseApp" */'firebase/app'),
        import(/* webpackChunkName: "FirebaseUI" */'firebaseui')
      ]).then(async ([firebase, firebaseui]) => {
        const form = document.createElement('div');
        const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
        resolve(form);
      })
    });
  }

  stateChanged(state: any) {
    this.state = state;
  }

  render() {
    return Template.bind(this)(this.state);
  }
}

window.customElements.define('app-login', AppLogin);
