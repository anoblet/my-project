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

store.addReducers({
  settings
});

export class AppSettings extends connect(store)(Mixin(LitElement, [BaseMixin, AuthChangedMixin, StateMixin, OnSnapshotMixin])) {
  template = './AppSettingsTemplate';
  @property({ type: Object }) state: any;

  // Lifecycle
  constructor() {
    super();
    // Always set an app level store
    this.setStore(store);
  }

  connectedCallback() {
    super.connectedCallback();
    console.log(this.state.settings);
    if(this.isEmpty(this.state.settings)) {
      this.setState({
        debug: false,
        theme: 'light',
        primaryColor: '#ff8000',
        secondaryColor: '#000000'
      }, 'settings');
    }
    this.registerAuthChangedCallback();
  }

  isEmpty(obj: any) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

  authChangedCallback(user: any) {
    console.log('Auth changed!', user);
    // alert('Auth changed!');
  }

  // Helpers
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

  // async _updateStore(data: any) {
  //   return await new Promise(async (resolve, reject) => {
  //     await store.dispatch(setDebug(data.debug));
  //     await store.dispatch(setTheme(data.theme));
  //     resolve();
  //   });
  // }

  // Handlers 
  _toggleDebugHandler() 
  {
    const val = !this.state.settings.debug;
    this.setState({
      debug: val
    }, 'settings');
    this._firebaseUp({
      debug: val
    })
  }

  _toggleThemeHandler() {
    const state = store.getState();
    const theme = state.settings.theme || 'light';
    const newTheme = theme == 'light' ? 'dark' : 'light';
    this.setState(
    {
      theme: newTheme
    }, 'settings');
    this._firebaseUp({
      theme: newTheme
    }, )
  }

  primaryColorChanged(e: any) {
    this.setState({
      primaryColor: e.target.value
    }, 'settings');
    this._firebaseUp({
      primaryColor: e.target.value
    })
  }

  secondaryColorChanged(e: any) {
    this.setState({
      secondaryColor: e.target.value
    }, 'settings');
  }

  // Events
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

  // Render
  render() {
    return Template.bind(this)(this.state);
  }

  stateChanged(state: any) {
    this.state = state;
    // this._firebaseUp(this.state.user);
    // this.debug = state.settings.debug;
    // this.theme = state.settings.theme;
  }
}

window.customElements.define('app-settings', AppSettings);
