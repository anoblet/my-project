import { LitElement, property } from '@polymer/lit-element';
import { Mixin } from '../Mixin';
import { BaseMixin } from '@anoblet/base-mixin';
import { DebugMixin } from '@anoblet/debug-mixin';

import Template from './MyCardTemplate';

// export class MyCard extends Mixin(LitElement, [BaseMixin]) {
  export class MyCard extends LitElement {
  render() {
    return Template.bind(this)({});
  }
}

window.customElements.define('my-card', MyCard);
