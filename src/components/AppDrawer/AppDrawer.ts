import { html, LitElement, property } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { Mixin } from '../../../packages/Mixin';
import { StateMixin } from '../../../packages/StateMixin';
import { TaskMixin } from '../../../packages/TaskMixin';
import { store } from '../../store.js';
import * as style from './AppDrawer.scss';
import Template from './AppDrawerTemplate';

/**
 * @todo Extend BaseElement
 */

export class AppDrawer extends Mixin(connect(store)(LitElement), [StateMixin, TaskMixin]) {
  public stateType: any = 'theme';

  // Lifecycle
  constructor() {
    super();
    this.setStore(store);
  }

  public connectedCallback() {
    super.connectedCallback();
    this.runTasks([
      import(/* webpackChunkName: "MyFlex" */'../../../packages/my-flex'),
      import(/* webpackChunkName: "MyGrid" */ '../../../packages/my-grid'),
      import(/* webpackChunkName: "MyLoader" */'../../../packages/my-loader'),
    ]);
  }

  public render() {
    return html`
      <style>${style}</style>
      ${!this.taskPending ? Template.bind(this)(this.state) : html`<my-loader></my-loader>`}
    `;
  }
}

window.customElements.define('app-drawer', AppDrawer);
