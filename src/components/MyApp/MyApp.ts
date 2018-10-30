import { html, LitElement, property, PropertyDeclaration } from '@polymer/lit-element';
import { BaseMixin } from '@anoblet/base-mixin';
import Template from './View/MyApp.ts';

const mixins = Array('BaseMixin', 'DebugMixin');

export class MyApp extends BaseMixin(LitElement) {
  @property({type: String}) title = 'Andrew Noblet'
  @property({type: Boolean}) drawerOpened = false;
  @property({type: Boolean}) darkTheme = false;

  // shadowRoot: any;

  _toggleDrawer() {
    this.drawerOpened = !this.drawerOpened;
    const drawer = this.shadowRoot.querySelector('#drawer');
    drawer.hidden = !drawer.hidden;
    const style = this.shadowRoot.querySelector('#drawer-container').style;
    style.gridTemplateColumns = this.drawerOpened ? '2fr 8fr' : 'auto';
    const opened = drawer.getAttribute('opened');
    opened || opened != '' ? drawer.setAttribute('opened', ''):  drawer.removeAttribute('opened');
  }

  _changeTheme() {
    this.darkTheme = !this.darkTheme;
    if(this.darkTheme) {
      this.style.background = '#242424'
      this.style.setProperty('--primary-color', '#eee');
    } else {
      this.style.background = '#fff'
      this.style.setProperty('--primary-color', '#242424');
    }
  }

  connectedCallback() {
    super.connectedCallback();
    console.log('Here');
    if(this.darkTheme) this.style.background = '#242424';
  }

  render() {
    return Template.bind(this)();
  }
}

window.customElements.define('my-app', MyApp);
