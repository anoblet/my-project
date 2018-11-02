import { html, LitElement, property } from '@polymer/lit-element';
import { Mixin } from '@anoblet/mixin';
import { BaseMixin } from '@anoblet/base-mixin'
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../..//store.js';

import Template from './MyAppTemplate';

/**
 * @todo Extend BaseElement
 * 
 * import { BaseElement } from '@anoblet/base-element';
 * class BaseElement2 extends Mixin(LitElement, [BaseMixin]) {}
 * 
 * class BaseElement2 extends Mixin(LitElement, [DebugMixin]) {}
 */
export class MyApp extends connect(store)(Mixin(LitElement, [BaseMixin])) {
  @property({type: String}) title = 'Andrew Noblet'

  _toggleDrawer() {
    const drawerContainer = this.shadowRoot.querySelector('#drawer-container')
    const drawer = this.shadowRoot.querySelector('#drawer');
    drawer._toggleAttribute('hidden');
    drawerContainer._toggleAttribute('opened');
    // this._toggleAttribute('hidden', drawer);

    // drawer.getAttribute('hidden') == '' ? drawer.removeAttribute('hidden') : drawer.setAttribute('hidden', '');
    // drawerContainer.getAttribute('opened') == '' ? drawerContainer.removeAttribute('opened') : drawerContainer.setAttribute('opened', '');
}

  stateChanged(state: any) {
    // this.theme = state.settings.theme;
    // this.debug = state.settings.debug;
    this.setAttribute('theme', state.settings.theme);
    state.settings.debug ? this.setAttribute('debug', '') : this.removeAttribute('debug');
    state.settings.theme == 'light' ? this.getAttribute('dark') ? this.removeAttribute('dark') : false : this.setAttribute('dark', '');
  }

  render() {
    return Template.bind(this)();
  }
}

window.customElements.define('my-app', MyApp);
