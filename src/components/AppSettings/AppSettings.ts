import { html, LitElement, property } from '@polymer/lit-element';
import { until } from 'lit-html/directives/until';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { BaseMixin } from '../../../packages/BaseMixin';
import { StateMixin } from '../../../packages/StateMixin';
import { Mixin } from '../../../packages/Mixin';
import { setDebug, setTheme } from '../../actions/Settings.js';
import { store } from '../../store.js';
import { AuthChangedMixin } from './AuthChangedMixin';
import { OnSnapshotMixin } from './OnSnapshotMixin';
import Template from './AppSettingsTemplate';
import { settings } from './redux/reducers/Settings';

// store.addReducers({
//   settings
// });

export class AppSettings extends connect(store)(Mixin(LitElement, [BaseMixin, AuthChangedMixin, OnSnapshotMixin, StateMixin])) {
  template = './AppSettingsTemplate';
  @property({ type: Object }) state = {};

  connectedCallback() {
    super.connectedCallback();
    this.registerAuthChangedCallback();
  }

  authChangedCallback(user: any) {
    console.log('Auth changed!', user);
    // alert('Auth changed!');
  }

  _firebaseUp(data: any) {
    Promise.all([
      import(/* webpackChunkName: "FirebaseApp" */ 'firebase/app'),
      import(/* webpackChunkName: "FirebaseAuth" */ 'firebase/auth'),
      import(/* webpackChunkName: "FirebaseFirestore" */ 'firebase/firestore'),
    ]).then(([firebase, auth, firestore]) => {
      firebase.auth().onAuthStateChanged((user: any) => {
        if (user) {
          const firestore = firebase.firestore();
          firestore.settings({ timestampsInSnapshots: true });
          const userSettings = firestore.doc(`users/${user.uid}/settings/default`);
          userSettings.set(data, { merge: true })
        }
      });
    });
  }

  _toggleDebugHandler() {
    const state = store.getState();
    store.dispatch(setDebug(!state.settings.debug));
    this._firebaseUp({
      debug: !state.settings.debug
    });
  }

  _toggleThemeHandler() {
    const state = store.getState();
    const theme = state.settings.theme || 'light';
    const newTheme = theme == 'light' ? 'dark' : 'light';
    store.dispatch(setTheme(newTheme));
    this._firebaseUp({
      theme: newTheme
    });
  }

  checkDefaults(document: any) {
    document.get().then((doc: any) => {
      if (!doc.exists) {
        document.set({
          debug: false,
          theme: 'light'
        })
      }
    });
  }

  _firebaseDown() {
    return new Promise((resolve, reject) => {
      Promise.all([
        import(/* webpackChunkName: "FirebaseApp" */ 'firebase/app'),
        import(/* webpackChunkName: "FirebaseAuth" */ 'firebase/auth'),
        import(/* webpackChunkName: "FirebaseFirestore" */ 'firebase/firestore'),
        import(/* webpackChunkName: "FirebaseUI" */ 'firebaseui'),
      ]).then(async ([firebase, auth, firestore, ui]) => {
        let instance = ui.auth.AuthUI.getInstance() || new ui.auth.AuthUI(firebase.auth());
        let pendingRedirect = instance.isPendingRedirect();
        firebase.auth().onAuthStateChanged((user: any) => {
          if (!user && !pendingRedirect) resolve();
          if (user) {
            const firestore = firebase.firestore();
            firestore.settings({ timestampsInSnapshots: true });
            const userSettings = firestore.doc(`users/${user.uid}/settings/default`);
            this.checkDefaults(userSettings);
            this.registerOnSnapshot(userSettings).then(() => {
              resolve();
            });
          }
        });
      });
    });
  }

  async _updateStore(data: any) {
    return await new Promise(async (resolve, reject) => {
      await store.dispatch(setDebug(data.debug));
      await store.dispatch(setTheme(data.theme));
      resolve();
    });
  }

  importTemplate() {
    return import(`${this.template}`).then(async (template) => {
      return await template.default.bind(this)()
    });
  }

  render() {
    return Template.bind(this)(this.state);
    return html`
      ${until(
      this.importTemplate().then(
      (template) => template
      ), html`Loading`
      )}
    `
  }

  stateChanged(state: any) {
    this.state = state;
    this.debug = state.settings.debug;
    this.theme = state.settings.theme;
  }
}

window.customElements.define('app-settings', AppSettings);
