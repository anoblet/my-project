import { html, LitElement, property } from '@polymer/lit-element';
import { until } from 'lit-html/directives/until';

import { Mixin } from '@anoblet/mixin';
import { BaseMixin } from '@anoblet/base-mixin'

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';
import { setDebug, setTheme } from '../../actions/Settings.js';

import Template from './AppSettingsTemplate'

const config = {
  apiKey: "AIzaSyA1sarBCzD7i_UBEMcE5321POKcAX48YYs",
  authDomain: "my-project-75792.firebaseapp.com",
  databaseURL: "https://my-project-75792.firebaseio.com",
  projectId: "my-project-75792",
  storageBucket: "",
  messagingSenderId: "552770278955"
};

export class AppSettings extends connect(store)(Mixin(LitElement, [BaseMixin])) {
  // @property({type: Boolean}) debug = false;
  // @property({type: String}) theme = 'light';
  @property({type: Boolean}) finished = false;
  template = './AppSettingsTemplate';

  connectedCallback() {
    super.connectedCallback();
    // this._firebaseDown();
  }

  async _firebaseDown() {
    return await Promise.all([
      import('firebase/app'),
      import('firebase/auth'),
      import('firebase/firestore'),
    ]).then(async ([firebase, auth, firestore]) => {
      return await firebase.auth().onAuthStateChanged(async (user: any) => {
        const firestore = firebase.firestore();
        const firebaseSettings = { timestampsInSnapshots: true };
        firestore.settings(firebaseSettings);
        const settings = firestore.collection("users").doc(user.uid).collection('settings');
        return await settings.get().then(async (querySnapshot: any) => {
          return await querySnapshot.forEach(async (doc: any) => {
            const data = doc.data();
            await store.dispatch(setDebug(data.debug));
            await store.dispatch(setTheme(data.theme));
            this.finished = true;
            return Promise.resolve('Finished');
          });
        });
      });
    });
  }



  _firebaseUp(data: any) {
    Promise.all([
      import('firebase/app'),
      import('firebase/auth'),
      import('firebase/firestore'),
    ]).then(([firebase, auth, firestore]) => {
      firebase.auth().onAuthStateChanged((user: any) => {
        if(user) {
          const firestore = firebase.firestore();
          firestore.settings({ timestampsInSnapshots: true });
          const settingsCollection = firestore.collection("users").doc(user.uid).collection('settings');
          settingsCollection.get().then((querySnapshot: any) => {
            querySnapshot.forEach((document: any) => {
              document.ref.set(data, { merge: true })
            });
          });
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
    const theme = state.settings.theme == 'light' ? 'dark' : 'light';
    store.dispatch(setTheme(theme));
    this._firebaseUp({
      theme: theme
    });
  }

   _asyncAction() {
    return Promise.all([
      import('firebase/app'),
      import('firebase/auth'),
      import('firebase/firestore'),
    ]).then(async ([firebase]) => {
      return new Promise(async (resolve, reject) => {
        return await firebase.auth().onAuthStateChanged((user: any) => {
          if(user) {
            resolve(new Promise(async (resolve, reject) => {
              const firestore = firebase.firestore();
              firestore.settings({ timestampsInSnapshots: true });
              const userSettings = firestore.collection("users").doc(user.uid).collection('settings').doc('default');
              await userSettings.get().then((doc: any) => {
                if(!doc.exists) {
                  userSettings.set({
                    debug: false,
                    theme: 'light'
                  })
                }
              });
              await userSettings.get().then((doc: any) => {
                this._updateStore(doc.data());
              });
              resolve();
            }));
          } else {
            resolve();
          }
        });
      });
    });
  }

  _updateStore(data: any) {
    return new Promise(async (resolve, reject) => {
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
    return html`${until(
      this.finished ? new Promise((resolve,reject) => resolve(this.importTemplate())) : this._asyncAction().then(() => {
        return this.importTemplate();
      }), html`<div class="loader">Loading</div>`
    )}`;
  }

  stateChanged(state: any) {
    this.debug = state.settings.debug;
    this.theme = state.settings.theme;
  }
}

window.customElements.define('app-settings', AppSettings);
