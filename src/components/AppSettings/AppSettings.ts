import { html, LitElement, property, PropertyDeclaration } from '@polymer/lit-element';
import { Mixin } from '@anoblet/mixin';
import { BaseMixin } from '@anoblet/base-mixin'
import Template from './AppSettingsTemplate';

export class AppSettings extends Mixin(LitElement, [BaseMixin]) {
  render() {
    return Template.bind(this)();
  }
}

window.customElements.define('app-settings', AppSettings);
