import { html } from '@polymer/lit-element';
import style from './MyFlex.scss';

export default function (props: any) {
  return html`
    <style>
      ${style}
    </style>
    <slot></slot>
  `
}

