import { html, LitElement, property, PropertyDeclaration } from '@polymer/lit-element';
import { BaseMixin } from '@anoblet/basemixin';
import Template from './View/MyApp.ts';


export class MyApp extends BaseMixin(LitElement) {
  @property({type: String}) title = 'Andrew Noblet'

  _toggleDrawer() {
    const drawer = this.shadowRoot.querySelector('my-drawer');
    drawer.opened = !drawer.opened;
  }

  render() {
    return Template.bind(this)();
  }
}

window.customElements.define('my-app', MyApp);
