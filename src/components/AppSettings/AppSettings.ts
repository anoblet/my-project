import { html, LitElement, property, PropertyDeclaration } from '@polymer/lit-element';
import { Mixin } from '@anoblet/mixin';
import { BaseMixin } from '@anoblet/base-mixin'
import Template from './AppSettingsTemplate';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';

export class AppSettings extends connect(store)(Mixin(LitElement, [BaseMixin])) {
  @property({type: String}) theme = 'light';

  render() {
    return Template.bind(this)();
  }

  stateChanged(state: any) {
    this.theme = state.settings.theme;
  }
}

window.customElements.define('app-settings', AppSettings);
