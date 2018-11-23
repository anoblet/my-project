import { LitElement, property } from '@polymer/lit-element';
import { BaseMixin } from '@anoblet/base-mixin';
import Template from './MyFlexTemplate';

export class MyFlex extends BaseMixin(LitElement) {
  @property({type: String, reflect: true}) direction: any;

  render() {
    return Template.bind(this)();
  }
}

window.customElements.define('my-flex', MyFlex);
