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

export class AppSettings extends connect(store)(Mixin(LitElement, [BaseMixin, AuthChangedMixin, StateMixin, OnSnapshotMixin])) {
  template = './AppSettingsTemplate';
  @property({ type: Object }) state: any;

  // Lifecycle
  connectedCallback() {
    super.connectedCallback();
    // if(this.isEmpty(this.state.settings)) {
    //   this.setState({
    //     debug: false,
    //     theme: 'dark',
    //     primaryColor: '#00ffff',
    //     secondaryColor: '#ff0080'
    //   }, 'settings');
    // }
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

  _toggleSync(value: any) {
    const state = store.getState();
    this.setState({
      sync: !state.app.sync
    }, 'app');
  }

  primaryColorChanged(e: any) {
    this.setState({
      primaryColor: e.target.value
    }, 'app');
    this._firebaseUp({
      primaryColor: e.target.value
    })
  }

  secondaryColorChanged(e: any) {
    this.setState({
      secondaryColor: e.target.value
    }, 'app');
    this._firebaseUp({
      secondaryColor: e.target.value
    })
  }

  // setTheme(theme: any) {
  //   this.setState({
  //     theme: theme
  //   }, 'settings');
  //   this._firebaseUp({
  //     theme: theme
  //   });
  // }

  setTheme(theme: any) {
    const settings = theme == 'light' ? {
      backgroundColor: '#fff',
      textColor: '#000'
    } : {
      backgroundColor: '#242424',
      textColor: '#fff'
    }
    this.setState(settings, 'app');
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
            // firestore.settings({ timestampsInSnapshots: true });
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
