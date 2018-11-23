import { html, LitElement } from '@polymer/lit-element';
import { Mixin } from '../../../packages/Mixin';
import { BaseMixin } from '../../../packages/BaseMixin';
import Template from './AppFooterTemplate';

export class AppFooter extends Mixin(LitElement, [BaseMixin]) {
  render() {
    return Template.bind(this)({})
  }
}

window.customElements.define('app-footer', AppFooter);
