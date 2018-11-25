import { html, LitElement } from '@polymer/lit-element';
import { Mixin } from '../../../packages/Mixin';
import { BaseMixin } from '../../../packages/BaseMixin';
import Template from './AppFooterTemplate';
import { Fab } from '@material/mwc-fab';

export class AppFooter extends Mixin(LitElement, [BaseMixin]) {
  firstUpdated() {
    const fabs = this.shadowRoot.querySelectorAll('mwc-fab');
    fabs.forEach((fab: any) => {
      fab.setAttribute('onmouseover', 'this.mini = false');
      fab.setAttribute('onmouseout', 'this.mini = true');
    })
  }

  // updated() {
  //   super.update();
  //   console.log('Here');
  //   const fab = this.shadowRoot.querySelector('#github');
  //   const button = fab.shadowRoot.querySelector('button');
  //   if(!button) this.requestUpdate();
  //   if(button) {
  //     button.style.backgroundImage = "url('https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/github.svg')";
  //     button.style.backgroundSize = 'contain';
  //   }
  // }

  render() {
    return Template.bind(this)({})
  }
}

window.customElements.define('app-footer', AppFooter);
