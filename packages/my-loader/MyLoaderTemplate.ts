import { html } from '@polymer/lit-element';
import style from './MyLoader.scss';

export default function (props: any) {
  return html`
    <style>
      ${style}
    </style>
    <div class="loader"></div>
  `
}

