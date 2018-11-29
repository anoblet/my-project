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
import Template from './AppThemeTemplate'; 
import { FirebaseMixin } from '../../../packages/FirebaseMixin';

/**
 * @todo Extend BaseElement
 */

export class MyApp extends connect(store)(Mixin(LitElement, [BaseMixin, TaskMixin, StateMixin, FirebaseMixin])) {
  @property({ type: String }) title = 'Andrew Noblet'
  defaultDocument = {
  };
  stateType: 'theme'

  // Lifecycle
  constructor() {
    super();
    this.setStore(store);
    this.addType('app');
  }
  connectedCallback() {
    super.connectedCallback();
    this.firebaseConfig = config.firebase;
    this.firebaseDocumentPath = 'state/app';
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
      this.getUser().then((user: any) => {
        this.setState(user, 'user');
      }),
      this.getDocument().then(
        (document: any) => this.setState(document, 'app')
      )
    ]);
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
          instance.start(document.createElement('div'), {});
        }
        resolve();
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

  updateStyles(state: any) {
    this.style.setProperty('--background-color', state.app.backgroundColor);
    this.style.setProperty('--text-color', state.app.textColor);
    this.style.setProperty('--primary-color', state.app.primaryColor);
    this.style.setProperty('--secondary-color', state.app.secondaryColor);
  }

  stateChanged(state: any) {
    this.state = state;
    if(state.app) this.updateStyles(state);
    this.setDocument(state.app);
    if(this.state.settings) {
      if (this.state.settings.debug != null) {
        this.state.settings.debug ? this.setAttribute('debug', '') : this.removeAttribute('debug');
      }
      if (this.state.settings.theme != null) {
        this.state.settings.theme == 'light' ? this.getAttribute('dark') == '' ? this.removeAttribute('dark') : false : this.setAttribute('dark', '');
      }
    }
  }

  render() {
    return html`
      <style>${style}</style>
      ${!this.taskPending ? Template.bind(this)(this.state) : html`<my-loader></my-loader>`}
    `;
  }
}

window.customElements.define('my-app', MyApp);
