import { html, LitElement, property } from 'lit-element';
import { BaseMixin } from '@anoblet/base-mixin';

const loremIpsum = require('lorem-ipsum');

export class LoremIpsum extends BaseMixin(LitElement) {
  @property({type: Number}) count: any;
  
  render() {
    return html`
      ${loremIpsum({count: this.count})}
    `
  }
}

window.customElements.define('lorem-ipsum', LoremIpsum);
