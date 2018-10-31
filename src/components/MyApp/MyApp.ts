import { html, LitElement, property, PropertyDeclaration } from '@polymer/lit-element';
import { Mixin } from '@anoblet/mixin';
import { BaseMixin } from '@anoblet/base-mixin'
import Template from './View/MyApp.ts';


/**
 * @todo Extend BaseElement
 * 
 * import { BaseElement } from '@anoblet/base-element';
 * class BaseElement2 extends Mixin(LitElement, [BaseMixin]) {}
 * 
 * class BaseElement2 extends Mixin(LitElement, [DebugMixin]) {}
 */
export class MyApp extends Mixin(LitElement, [BaseMixin]) {
  @property({type: String}) title = 'Andrew Noblet'
  @property({type: Boolean}) drawerOpened = false;
  // @property({type: Boolean, reflect: true, attribute: 'dark'}) darkTheme = false;

  // shadowRoot: any;

  _toggleDrawer() {
    const drawer = this.shadowRoot.querySelector('#drawer');
    drawer.hidden = !drawer.hidden;
    const style = this.shadowRoot.querySelector('#drawer-container').style;
    style.gridTemplateColumns = !drawer.hidden ? '2fr 8fr' : 'auto';
    // style.flex = !drawer.hidden ? '0 0 20%' : '0 0 0'
    return
    const drawerContainer = this.shadowRoot.querySelector('#drawer-container');
    const opened = drawerContainer.getAttribute('drawer-opened');
    opened || opened != '' ? drawerContainer.setAttribute('drawer-opened', '') : drawerContainer.removeAttribute('drawer-opened');
    return;
// const opened = drawer.getAttribute('opened');
    // opened || opened != '' ? drawer.setAttribute('opened', ''):  drawer.removeAttribute('opened');
  }

  _changeTheme() {
    // this.darkTheme = !this.darkTheme;
    this._toggleAttribute('dark');
    // const dark = this.getAttribute('dark');
    // dark || dark == '' ? this.removeAttribute('dark') : this.setAttribute('dark', '');
  }

  _toggleAttribute(attribute: any) {
    const val = this.getAttribute(attribute);
    val == '' ? this.removeAttribute(attribute) : this.setAttribute(attribute, '');
  }

  connectedCallback() {
    super.connectedCallback();
    if(this.darkTheme) this.style.background = '#242424';
  }

  render() {
    return Template.bind(this)();
  }
}

window.customElements.define('my-app', MyApp);
