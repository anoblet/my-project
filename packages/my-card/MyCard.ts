import { LitElement, property } from '@polymer/lit-element';
import { Mixin } from '../Mixin';
import { BaseMixin } from '@anoblet/base-mixin';

import Template from './MyCardTemplate';

export class MyCard extends Mixin(LitElement, [BaseMixin]) {
  @property({type: Boolean}) collapsible: any = false;
  @property({type: Boolean, reflect: true}) collapsed: any = false;

  toggle() {
    this.collapsed = !this.collapsed;
  }

  render() {
    return Template.bind(this)({});
  }
}

window.customElements.define('my-card', MyCard);
