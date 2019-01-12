import { LitElement } from 'lit-element';
import { Mixin } from '@anoblet/mixin';
import { BaseMixin } from '@anoblet/base-mixin';

import Template from './MyLoaderTemplate';

export class MyLoader extends Mixin(LitElement, [BaseMixin]) {  
  render() {
    return Template.bind(this)();
  }
}

window.customElements.define('my-loader', MyLoader);
