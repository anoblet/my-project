import { html, LitElement } from '@polymer/lit-element';
import { Mixin } from '../../../packages/Mixin';
import { BaseMixin } from '../../../packages/BaseMixin';
import { TaskMixin } from '../../../packages/TaskMixin';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';
import { StateMixin } from '../../../packages/StateMixin';
import { FirebaseMixin } from '../../../packages/FirebaseMixin';
import Template from './PageInfoTemplate';
import * as Style from './PageInfo.scss';

export class PageInfo extends Mixin(connect(store)(LitElement), [TaskMixin, StateMixin, FirebaseMixin]) {
  render() {
    return html`
      <style>${Style}</style>
      ${!this.taskPending ? Template.bind(this)(this.state) : html`<my-loader></my-loader>`}
    `;
  }
}

window.customElements.define('page-info', PageInfo);
