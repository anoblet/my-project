import { html } from 'lit-element';
import style from './MyGrid.scss';

export default function (props: any) {
  return html`
    <style>
      ${style}
    </style>
    <slot></slot>
  `
}

