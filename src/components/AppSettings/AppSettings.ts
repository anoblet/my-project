import { LitElement } from '@polymer/lit-element';
import { Mixin } from '@anoblet/mixin';
import { BaseMixin } from '@anoblet/base-mixin'

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';
import { setDebug, setTheme } from '../../actions/Settings.js';

import Template from './AppSettingsTemplate';

export class AppSettings extends connect(store)(Mixin(LitElement, [BaseMixin])) {

  _toggleDebugHandler() {
    const state = store.getState();
    store.dispatch(setDebug(!state.settings.debug));
  }

  _toggleThemeHandler() {
    const state = store.getState();
    const theme = state.settings.theme == 'light' ? 'dark' : 'light';
    store.dispatch(setTheme(theme));
  }

  render() {
    return Template.bind(this)();
  }

  stateChanged(state: any) {
  }
}

window.customElements.define('app-settings', AppSettings);
