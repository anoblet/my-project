import { html, LitElement, property } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { Mixin } from '../../../packages/Mixin';
import { StateMixin } from '../../../packages/StateMixin';
import { TaskMixin } from '../../../packages/TaskMixin';
import { store } from '../../store.js';
import * as style from './DrawerAbsolute.scss';
import Template from './DrawerAbsoluteTemplate';

export class DrawerAbsolute extends Mixin(connect(store)(LitElement), [StateMixin, TaskMixin]) {
  public render() {
    return html`
      <style>${style}</style>
      ${!this.taskPending ? Template.bind(this)(this.state) : html`<my-loader></my-loader>`}
    `;
  }
}

window.customElements.define('app-drawer-absolute', DrawerAbsolute);
