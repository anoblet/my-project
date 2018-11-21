import { LitElement, property } from '@polymer/lit-element';
import { BaseMixin } from '@anoblet/base-mixin';

// import './src/components/MyRow/MyRow'
// import './src/components/MyColumn/MyColumn'

import Template from './View/MyGrid';

export class MyGrid extends BaseMixin(LitElement) {
  @property({type: String}) direction = 'row'
  
  render() {
    return Template.bind(this)();
  }
}

window.customElements.define('my-grid', MyGrid);
