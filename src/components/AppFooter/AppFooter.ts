import { html, LitElement } from '@polymer/lit-element';
import { Mixin } from '../../../packages/Mixin';
import { BaseMixin } from '../../../packages/BaseMixin';
import Template from './AppFooterTemplate';
import '@material/mwc-fab';

export class AppFooter extends Mixin(LitElement, [BaseMixin]) {
  // firstUpdated() {
  //   const fabs = this.shadowRoot.querySelectorAll('mwc-fab:not(#home)');
  //   fabs.forEach((fab: any) => {
  //     fab.setAttribute('onmouseover', 'this.mini = false');
  //     fab.setAttribute('onmouseout', 'this.mini = true');
  //   })
  // }

  render() {
    return Template.bind(this)({})
  }
}

window.customElements.define('app-footer', AppFooter);
