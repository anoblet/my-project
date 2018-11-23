import { html, LitElement, property } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { config } from '../../../config';
import { BaseMixin } from '../../../packages/BaseMixin';
import { Mixin } from '../../../packages/Mixin';
import { store } from '../../store.js';
import { TaskMixin } from '../../../packages/TaskMixin';
import { AppSettings } from '../AppSettings/AppSettings';
import * as style from './MyApp.scss';
import Template from './MyAppTemplate';

const AppSettingsI = new AppSettings;

/**
 * @todo Extend BaseElement
 * 
 * import { BaseElement } from '@anoblet/base-element';
 * class BaseElement2 extends Mixin(LitElement, [BaseMixin]) {}
 * 
 * class BaseElement2 extends Mixin(LitElement, [DebugMixin]) {}
 */
export class MyApp extends connect(store)(Mixin(LitElement, [BaseMixin, TaskMixin])) {
  @property({ type: String }) title = 'Andrew Noblet'
  taskPending = false;
  template = './MyAppTemplate'

  // Lifecycle
  connectedCallback() {
    super.connectedCallback();
    this.runTasks([
      import(/* webpackChunkName: "MyFlex" */'../../../packages/my-flex'),
      import(/* webpackChunkName: "MyGrid" */ '../../../packages/my-grid'),
      import(/* webpackChunkName: "MyLoader" */'../../../packages/my-loader'),
      import(/* webpackChunkName: "MWC-Icon" */'@material/mwc-icon'),
      import(/* webpackChunkName: "MWC-Fab" */'@material/mwc-fab'),
      import(/* webpackChunkName: "AppFooter" */ '../AppFooter/AppFooter'),
      import(/* webpackChunkName: "AppLogin" */ '../AppLogin/AppLogin'),
      import(/* webpackChunkName: "AppSettings" */ '../AppSettings/AppSettings'),
      this.initFirebase(),
      this.checkRedirect(),
      AppSettingsI._firebaseDown()
    ]);
  }

  // Helpers
  initFirebase() {
    return new Promise((resolve, reject) => {
      import(/* webpackChunkName: "FirebaseApp" */ 'firebase/app').then((app) => {
        if (app.apps.length === 0) app.initializeApp(config.firebase);
        resolve();
      });
    });
  }

  checkRedirect() {
    return new Promise((resolve, reject) => {
      resolve();
      Promise.all([
        import(/* webpackChunkName: "FirebaseApp" */'firebase/app'),
        import(/* webpackChunkName: "FirebaseAuth" */'firebase/auth'),
        import(/* webpackChunkName: "FirebaseUI" */'firebaseui'),
      ]).then(([app, auth, ui]) => {
        let instance = ui.auth.AuthUI.getInstance() || new ui.auth.AuthUI(app.auth());
        if (instance.isPendingRedirect()) {
          const e = document.createElement('div');
          instance.start(e, {});
          app.auth().onAuthStateChanged((user: any) => {
            if (user) resolve();
          });
        } else {
          resolve();
        }
      })
    });
  }

  // Events
  _toggleDrawer() {
    const drawer = this.shadowRoot.querySelector('#drawer');
    const drawerContainer = this.shadowRoot.querySelector('#drawer-container')
    drawer._toggleAttribute('hidden');
    drawerContainer._toggleAttribute('opened');
  }

  stateChanged(state: any) {
    console.log('State changed');
    if (state.settings.debug != null) {
      state.settings.debug ? this.setAttribute('debug', '') : this.removeAttribute('debug');
    }
    if (state.settings.theme != null) {
      state.settings.theme == 'light' ? this.getAttribute('dark') == '' ? this.removeAttribute('dark') : false : this.setAttribute('dark', '');
    }
  }

  render() {
    return this.taskPending ?
      html`<style>${style}</style><my-loader></my-loader>` :
      Template.bind(this)();
  }
}

window.customElements.define('my-app', MyApp);
