import { html } from '@polymer/lit-element';
import style from './MyCard.scss';

export default function (props: any) {
  return html`
    <style>${style}</style>
    <div id="title">
      <h2>
        <slot name="title"></slot>
      </h2>
      ${this.collapsible ? html`<mwc-icon @click="${(e: any) => this.toggle()}">${this.collapsed ? 'expand_more' : 'expand_less'}</mwc-icon>` : ''}
    </div>
    <div id="content">
      <slot name="content"></slot>
    </div
  `;
}
