import { html, LitElement } from '@polymer/lit-element';
import { Mixin } from '../../../packages/Mixin';
import { BaseMixin } from '../../../packages/BaseMixin';

export class AppFooter extends Mixin(LitElement, [BaseMixin]) {
  render() {
    return html`Footer`;
  }
}

window.customElements.define('app-footer', AppFooter);
