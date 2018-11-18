import { html, LitElement, property } from '@polymer/lit-element';
import { until } from 'lit-html/directives/until';

import { Mixin } from '@anoblet/mixin';
import { BaseMixin } from '@anoblet/base-mixin'
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';

import * as style from './MyApp.scss';
import { AppSettings } from '../AppSettings/AppSettings';
const AppSettingsI = new AppSettings;

import Template from './MyAppTemplate';

import(/* webpackChunkName: "AppLogin" */ '../AppLogin/AppLogin');
// import(/* webpackChunkName: "MyRouter" */ '@anoblet/my-router');

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
  // @property({ type: String, reflect: true }) debug = false;
  // @property({ type: String }) theme  = 'light';
  @property({ type: Boolean }) synced  = false;

  // firebase = {};
  firebaseConfig = {
    apiKey: "AIzaSyA1sarBCzD7i_UBEMcE5321POKcAX48YYs",
    authDomain: "my-project-75792.firebaseapp.com",
    databaseURL: "https://my-project-75792.firebaseio.com",
    projectId: "my-project-75792",
    storageBucket: "",
    messagingSenderId: "552770278955"
  }
  template = './MyAppTemplate'
  taskPending = false;
  constructor() {
    super();
    import(/* webpackChunkName: "AppSettings" */ '../AppSettings/AppSettings');
    import(/* webpackChunkName: "MyGrid" */ '@anoblet/my-grid')
    import(/* webpackChunkName: "MyFlex" */'@anoblet/my-flex')
    import(/* webpackChunkName: "MyLoader" */'@anoblet/my-loader')
    import(/* webpackChunkName: "MWC-Icon" */'@material/mwc-icon')
    import(/* webpackChunkName: "MWC-Fab" */'@material/mwc-fab')
  }

  _toggleDrawer() {
    const drawer = this.shadowRoot.querySelector('#drawer');
    const drawerContainer = this.shadowRoot.querySelector('#drawer-container')
    drawer._toggleAttribute('hidden');
    drawerContainer._toggleAttribute('opened');
  }

  connectedCallback() {
    super.connectedCallback();
    Promise.all([
      import('firebase/app'),
    ]).then(([firebase, auth, firestore]) => {
      if (firebase.apps.length === 0) firebase.initializeApp(config);
    });
    // this.runTask(this.checkRedirect());
    this.runTasks([
      this.checkRedirect(),
      AppSettingsI._firebaseDown()
    ]);
  }

  stateChanged(state: any) {
    if(state.settings.debug != null) {
      state.settings.debug ? this.setAttribute('debug', '') : this.removeAttribute('debug');
    }
    if(state.settings.theme != null) {
      state.settings.theme == 'light' ? this.getAttribute('dark') == '' ? this.removeAttribute('dark') : false : this.setAttribute('dark', '');
    }
  }

  importTemplate() {
    return import(`${this.template}`).then(async (template) => {
      return await template.default.bind(this)()
    });
  }

  async _preRender(dependencies: any) {
    return await new Promise(async (resolve, reject) => {
      return await Promise.all(dependencies).then (() => {
        resolve();
      })
    });
  }

  _loadingTemplate() {
    return html`<my-loader></my-loader>`
  }

  checkRedirect() {
    return new Promise((resolve, reject) => {
      Promise.all([
        import('firebase/app'),
        import('firebase/auth'),
        import('firebaseui'),
      ]).then(([app, auth, ui]) => {
        let instance = ui.auth.AuthUI.getInstance() || new ui.auth.AuthUI(app.auth());
        if(instance.isPendingRedirect()) {
          const e = document.createElement('div');
          instance.start(e, {});
          console.log('Pending');
          app.auth().onAuthStateChanged((user: any) => {
            console.log('State changed');
            console.log(user);
            if(user) resolve();
          });
        } else {
          resolve();
        }
      })
    });
  }

  async runTask(task: Promise<any>) {
    this.taskPending = true;
    this.requestUpdate();
    await Promise.all([task]).then(() => {
      console.log('Here');
      this.taskPending = false;
      this.requestUpdate();
    });
  }
  

  async runTasks(tasks: any) {
    this.taskPending = true;
    this.requestUpdate();
    await Promise.all(tasks).then(() => {
      this.taskPending = false;
      this.requestUpdate();
    });
  }

  render() {
    return this.taskPending ?
      html`<style>${style}</style><my-loader></my-loader>` :
      Template.bind(this)();
  }
}

window.customElements.define('my-app', MyApp);
