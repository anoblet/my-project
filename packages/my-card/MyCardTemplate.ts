import { html } from '@polymer/lit-element';
import style from './MyCard.scss';

export default function (props: any) {
  return html`<style>${style}</style><h2><slot name="title"></slot></h2><slot name="content"></slot>`;
  // return html`<style>${style}</style><h2><slot name="title"></slot></h2><slot></slot>`;
}
