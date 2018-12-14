import { html, LitElement } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { BaseMixin } from '../../../packages/BaseMixin';
import { FirebaseMixin } from '../../../packages/FirebaseMixin';
import '../../../packages/lorem-ipsum';
import { Mixin } from '../../../packages/Mixin';
import { StateMixin } from '../../../packages/StateMixin';
import { TaskMixin } from '../../../packages/TaskMixin';
import { store } from '../../store.js';
import * as Style from './PageHome.scss';
import Template from './PageHomeTemplate';

export class PageHome extends Mixin(connect(store)(LitElement), [
  TaskMixin,
  StateMixin
]) {
  public render() {
    return html`
      <style>
        ${Style}
      </style>
      ${
        !this.taskPending
          ? Template.bind(this)(this.state)
          : html`
              <my-loader></my-loader>
            `
      }
    `;
  }
}

window.customElements.define('page-home', PageHome);
