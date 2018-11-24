import { html, LitElement, property } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { config } from '../../../config';
import { BaseMixin } from '../../../packages/BaseMixin';
import { StateMixin } from '../../../packages/StateMixin';
import { Mixin } from '../../../packages/Mixin';
import { store } from '../../store.js';
import { TaskMixin } from '../../../packages/TaskMixin';
import { AppSettings } from '../AppSettings/AppSettings';
import * as style from './MyApp.scss';
import Template from './MyAppTemplate';

const settings = new AppSettings;

/**
 * @todo Extend BaseElement
 */

export class MyApp extends connect(store)(Mixin(LitElement, [BaseMixin, TaskMixin, StateMixin])) {
  @property({ type: String }) title = 'Andrew Noblet'
  @property({ type: Object }) state: any;
  taskPending = false;

  // Lifecycle
  connectedCallback() {
    super.connectedCallback();
    // this.setState({
    //   primaryColor: '#CCCCCC',
    //   secondaryColor: '#000000'
    // }, 'settings');
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
      settings._firebaseDown()
    ]);
  }

  updated(changedProperties: any) {
    super.updated(changedProperties);
    if(!this.taskPending) this.setButtonBackground();
  }

  setButtonBackground() {
    const fab = this.shadowRoot.querySelector('mwc-fab');
    const button = fab.shadowRoot.querySelector('button')
    if(button) {
      button.style.background = `url('${this.state.user.photo}')`;
      button.style.backgroundSize = "contain";
    }
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
    this.state = state;
    if(this.state.settings) {
      this.style.setProperty('--mdc-theme-primary', this.state.settings.primaryColor);
      this.style.setProperty('--mdc-theme-secondary', this.state.settings.secondaryColor);
      if (this.state.settings.debug != null) {
        this.state.settings.debug ? this.setAttribute('debug', '') : this.removeAttribute('debug');
      }
      if (this.state.settings.theme != null) {
        this.state.settings.theme == 'light' ? this.getAttribute('dark') == '' ? this.removeAttribute('dark') : false : this.setAttribute('dark', '');
      }
    }
  }

  render() {
    return this.taskPending ?
      html`<style>${style}</style><my-loader></my-loader>` :
      Template.bind(this)(this.state);
  }
}

window.customElements.define('my-app', MyApp);
