import { LitElement, property } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { config } from '../../../config';
import { BaseMixin } from '../../../packages/BaseMixin';
import { Mixin } from '../../../packages/Mixin';
import { StateMixin } from '../../../packages/StateMixin';
// import { StateMixin } from './StateMixin';
import { TaskMixin } from '../../../packages/TaskMixin';
import { setDebug, setTheme } from '../../actions/Settings.js';
import { store } from '../../store.js';
import Template from './AppLoginTemplate';
import { user } from './redux/reducers/User';

store.addReducers({
  user
});

export class AppLogin extends connect(store)(Mixin(LitElement, [BaseMixin, TaskMixin, StateMixin])) {
  @property({ type: Boolean }) isSignedIn = false;
  @property({ type: Object }) state = {};
  form: any;

  connectedCallback() {
    super.connectedCallback();
    this.runTasks([
      this.registerAuthStateChanged(),
    ])
  }

  // _isSignedIn() {
  //   return new Promise((resolve, reject) => {
  //     Promise.all([
  //       import(/* webpackChunkName: "FirebaseApp" */ 'firebase/app'),
  //       import(/* webpackChunkName: "FirebaseAuth" */'firebase/auth'),
  //     ]).then(([firebase]) => {
  //       firebase.auth().onAuthStateChanged((user: any) => {
  //         if (this.isSignedIn && !user) this._logoutHandler();
  //         this.isSignedIn = user ? true : false;
  //         resolve(user ? true : false);
  //       });
  //     });
  //   });
  // }

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
    this.setState(userModel);
  }

  getPhotoUrl(user: any) {
    return user.photoURL;
  }

  _upgrade() {
    return new Promise(async (resolve, reject) => {
      Promise.all([
        import(/* webpackChunkName: "FirebaseApp" */'firebase/app'),
        import(/* webpackChunkName: "FirebaseUI" */'firebaseui')
      ]).then(async ([firebase, firebaseui]) => {
        const instance = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
        const e = document.createElement('div');
        instance.start(e, config.firebaseui);
        this.form = e;
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
    const settings= store.getState().settings;
    const mergedState = {...settings, ...data}
    return new Promise(async (resolve, reject) => {
      await store.dispatch(setDebug(mergedState.debug));
      await store.dispatch(setTheme(mergedState.theme));
      resolve();
    });
  }

  _logoutHandler() {
    this.setState({signedIn: false});
    this.logout();
  }

  logout() {
    Promise.all([
      import(/* webpackChunkName: "FirebaseApp" */ 'firebase/app'),
      // import(/* webpackChunkName: "firebaseAuth" */ 'firebase/auth')
    ]).then(([firebase]) => {
      firebase.auth().signOut();
      this.setState({
        name: false,
        email: false,
        photo: false
      })
      this.runTasks([
        this._resetSettings(),
      ])
    });
  }

  getForm() {
    return Promise.all([
      import(/* webpackChunkName: "FirebaseApp" */'firebase/app'),
      import(/* webpackChunkName: "FirebaseUI" */'firebaseui')
    ]).then(async ([firebase, firebaseui]) => {
      const form = document.createElement('div');
      const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
      ui.start(form, config.firebaseui);
      return form;
    })
  }

  stateChanged(state: any) {
    this.state = state.user;
  }

  render() {
    return Template.bind(this)(this.state);
  }
}

window.customElements.define('app-login', AppLogin);
